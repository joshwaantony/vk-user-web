const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "true" ||
      normalized === "completed" ||
      normalized === "done"
    );
  }
  return false;
};

const pickObject = (...candidates) => {
  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === "object" &&
      !Array.isArray(candidate)
    ) {
      return candidate;
    }
  }
  return {};
};

export const extractPayload = (response) => {
  const root =
    response && response.data !== undefined ? response.data : response;

  if (root?.success === false) {
    throw new Error(root.message || "Request failed");
  }

  const payload = root?.data !== undefined ? root.data : root;
  if (payload?.success === false) {
    throw new Error(payload.message || "Request failed");
  }

  return payload || {};
};

export const normalizeLessonProgress = (input) => {
  const source = pickObject(
    input?.lessonProgress,
    input?.progress,
    input?.lesson,
    input
  );

  const watchedSeconds =
    toNumber(source.watchedSeconds) ??
    toNumber(source.watchedDuration) ??
    toNumber(source.watchTime) ??
    0;

  const percent =
    toNumber(source.percent) ??
    toNumber(source.percentage) ??
    toNumber(source.completionPercent) ??
    toNumber(source.completionPercentage) ??
    null;

  return {
    ...source,
    watchedSeconds,
    percent,
    isCompleted:
      toBoolean(source.isCompleted) ||
      toBoolean(source.completed) ||
      toBoolean(source.done) ||
      source.status === "COMPLETED",
  };
};

export const normalizeCourseProgress = (input, fallback = {}) => {
  const source = pickObject(
    input?.courseProgress,
    input?.progress,
    input
  );

  const completedLessons =
    toNumber(source.completedLessons) ??
    toNumber(source.completedLessonCount) ??
    toNumber(source.completedCount) ??
    0;

  const totalLessons =
    toNumber(source.totalLessons) ??
    toNumber(source.lessonCount) ??
    toNumber(source.totalCount) ??
    toNumber(fallback?.totalLessons) ??
    0;

  const derivedPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const percent =
    toNumber(source.percent) ??
    toNumber(source.percentage) ??
    toNumber(source.completionPercent) ??
    toNumber(source.completionPercentage) ??
    derivedPercent;

  return {
    ...source,
    completedLessons,
    totalLessons,
    percent: Math.max(0, Math.min(100, percent)),
  };
};

export const isItemCompleted = (item) =>
  toBoolean(item?.isCompleted) ||
  toBoolean(item?.completed) ||
  toBoolean(item?.done) ||
  item?.status === "COMPLETED";
