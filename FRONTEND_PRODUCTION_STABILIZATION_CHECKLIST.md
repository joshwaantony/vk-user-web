# Frontend Production Stabilization Checklist

This checklist converts the pre-production frontend audit into actionable tasks.

## How to use this file

- Work top to bottom.
- Do not skip `Critical` items before launch.
- Mark tasks complete only after code changes and manual verification.
- Treat anything labeled `Needs backend alignment` as cross-team work.

## Critical Launch Blockers

### 1. Remove global app blanking during auth bootstrap

- [x] Refactor [`src/components/AuthProvider.jsx`](/Users/apple/Downloads/vk-user-web/src/components/AuthProvider.jsx) so it does not return `null` for the whole app while session restore is running.
- [x] Keep public routes renderable without waiting for auth restore.
- [x] Move blocking auth checks to protected routes/pages/components instead of the root layout.
- [x] Ensure slow session restore does not cause a white screen on `/home`, `/course`, `/contact`, or legal pages.
- [ ] Verify refresh on a slow network still shows usable UI instead of a blank screen.

Acceptance checks:

- [ ] Public pages render HTML immediately on first load.
- [ ] Expired session no longer blanks the app.
- [ ] Protected routes still redirect or gate correctly.

### 2. Replace client-owned auth with server-owned session protection

- [ ] Stop relying on `localStorage` as the source of truth for access tokens in [`src/api/axios.js`](/Users/apple/Downloads/vk-user-web/src/api/axios.js) and [`src/store/auth.store.js`](/Users/apple/Downloads/vk-user-web/src/store/auth.store.js).
- [ ] Remove the JavaScript-written `token` cookie pattern from auth/session code.
- [ ] Update [`middleware.js`](/Users/apple/Downloads/vk-user-web/middleware.js) to validate a server-owned session cookie, not just the existence of a client-set token string.
- [ ] Align frontend auth flow with secure `httpOnly` cookie session handling.
- [ ] Review logout flow to make sure session is invalidated both client-side and server-side.
- [ ] Needs backend alignment: confirm cookie names, expiry, refresh behavior, and middleware validation contract.

Acceptance checks:

- [ ] Protected routes cannot be opened by manually setting `document.cookie`.
- [ ] Auth still works after refresh without reading bearer tokens from `localStorage`.
- [ ] Logout fully removes access to protected routes and APIs.

## High Priority Stabilization Tasks

### 3. Fix post-login redirect flow

- [ ] Preserve `redirect` query param across password login, OTP login, signup, and password reset entry points.
- [ ] Update [`src/components/auth/LoginForm.jsx`](/Users/apple/Downloads/vk-user-web/src/components/auth/LoginForm.jsx) to redirect users to the originally requested route after successful login.
- [ ] Update [`src/components/auth/OtpForm.jsx`](/Users/apple/Downloads/vk-user-web/src/components/auth/OtpForm.jsx) to honor redirect targets instead of always sending users to `/course`.
- [ ] Ensure redirect survives the `/phone/enter-phone` -> `/phone/verify` flow.
- [ ] Add validation so redirect targets are internal-safe paths only.

Acceptance checks:

- [ ] Direct visit to `/profile` redirects to login, then returns to `/profile` after success.
- [ ] Direct visit to `/lessons/[id]/watch?...` returns the user to the lesson after auth.

### 4. Fix checkout state and direct-load purchase reliability

- [ ] Refactor [`src/components/Coupon/CouponPopup.jsx`](/Users/apple/Downloads/vk-user-web/src/components/Coupon/CouponPopup.jsx) so it does not derive course price only from the course list store.
- [ ] Use course detail data or order creation response as the source of truth for payable amount.
- [ ] Remove the `selectedCourse?.price ?? 0` fallback that can incorrectly turn paid checkout into free checkout logic.
- [ ] Add explicit handling when Razorpay SDK is not loaded.
- [ ] Add a recovery state for payment verification pending/failure after refresh.
- [ ] Review `vk_pending_payment` persistence and ensure it is used only for UX recovery, not trust decisions.

Acceptance checks:

- [ ] Buying a course works after refreshing `/course/[courseId]`.
- [ ] Buying a paid course no longer falls into free-checkout logic.
- [ ] Checkout shows a clear retryable error if Razorpay script is unavailable.

### 5. Normalize auth API response parsing

- [ ] Standardize parsing for login, register, refresh, `getMe`, and `updateMe`.
- [ ] Fix the register flow in [`src/store/auth.store.js`](/Users/apple/Downloads/vk-user-web/src/store/auth.store.js) so it reads the same payload shape used by other auth actions.
- [ ] Remove inconsistent `res.data ?? res ?? {}` handling spread across auth code.
- [ ] Create one shared auth payload normalizer if needed.

Acceptance checks:

- [ ] Signup succeeds correctly when backend returns top-level auth fields.
- [ ] Login, OTP login, refresh, and fetchMe all populate user/token consistently.

### 6. Guard refresh/direct access for multi-step auth flows

- [ ] Add route guards for `/phone/verify`, `/signup`, and `/reset-password` when required in-memory auth flow state is missing.
- [ ] Redirect users back to the correct earlier step when `phone`, `purpose`, `verificationToken`, or `passwordResetToken` is absent.
- [ ] Consider moving required flow state to secure query params or backend-backed temporary state if needed.

Acceptance checks:

- [ ] Refreshing `/phone/verify` no longer leaves the user stranded.
- [ ] Refreshing `/reset-password` no longer results in a dead-end submit failure.

### 7. Harden protected pages against stale auth state

- [ ] Audit pages that read `token` from Zustand and instantly redirect or render null, especially [`src/app/(user)/profile/page.js`](/Users/apple/Downloads/vk-user-web/src/app/(user)/profile/page.js).
- [ ] Replace client-only token checks with session-aware route gating where possible.
- [ ] Remove `return null` protected-page fallthroughs that cause blank UI.
- [ ] Ensure expired sessions fail gracefully with redirect or message instead of half-render + 401s.

Acceptance checks:

- [ ] Protected pages do not flash, blank, or partially render with stale auth.
- [ ] Session expiry behavior is consistent across refresh and client navigation.

### 8. Fix production image host failures

- [ ] Audit all `next/image` remote sources.
- [ ] Update [`next.config.mjs`](/Users/apple/Downloads/vk-user-web/next.config.mjs) to allow all real production image hosts used by user avatars and course content.
- [ ] Specifically review avatar rendering in [`src/app/(user)/profile/page.js`](/Users/apple/Downloads/vk-user-web/src/app/(user)/profile/page.js).
- [ ] Add fallback rendering when remote image host is missing or invalid.

Acceptance checks:

- [ ] Profile page does not crash when avatar URL is not from Cloudinary.
- [ ] All known production image hosts render correctly after build.

## Medium Priority Reliability Tasks

### 9. Add route-level error/loading/not-found boundaries

- [ ] Add `loading.js` and `error.js` for high-risk routes:
- [ ] `/course`
- [ ] `/course/[courseId]`
- [ ] `/lessons/[lessonId]/watch`
- [ ] `/my-course`
- [ ] `/profile`
- [ ] Add `not-found.js` where missing for route-specific failure recovery.
- [ ] Ensure data/API failures produce recoverable UI with retry guidance.

Acceptance checks:

- [ ] Failed course fetch does not collapse into generic app failure.
- [ ] Lesson page failures show a user-facing recovery state.

### 10. Remove duplicate fetches and loading-state contention in course/lesson flows

- [ ] Consolidate course fetching between [`src/components/course/course-lesson/LessonContent.jsx`](/Users/apple/Downloads/vk-user-web/src/components/course/course-lesson/LessonContent.jsx) and [`src/components/course/course-lesson/LessonSidebar.jsx`](/Users/apple/Downloads/vk-user-web/src/components/course/course-lesson/LessonSidebar.jsx).
- [ ] Consolidate course progress fetching to a single owner per page.
- [ ] Split shared Zustand loading flags so one resource does not blank another.
- [ ] Remove redundant background refetch loops where possible.

Acceptance checks:

- [ ] Lesson page makes fewer duplicate API calls on initial load.
- [ ] Sidebar and content do not fight over shared loading state.

### 11. Fix My Courses error handling and payload safety

- [ ] Update [`src/components/my-course/MyCourses.jsx`](/Users/apple/Downloads/vk-user-web/src/components/my-course/MyCourses.jsx) to render explicit error UI when enrollment fetch fails.
- [ ] Guard nested fields like `item.course.instructor.name` and `item.progress.*`.
- [ ] Normalize enrollment data before rendering.
- [ ] Avoid showing empty-state messaging when the real state is fetch failure.

Acceptance checks:

- [ ] API failure on `/my-course` shows an error state, not “No courses in progress”.
- [ ] Partial enrollment payloads do not crash rendering.

### 12. Fix duplicate course filter requests

- [ ] Remove the extra `fetchCourses()` call from either the filter click handler or the effect in [`src/components/course/CourseFilters.jsx`](/Users/apple/Downloads/vk-user-web/src/components/course/CourseFilters.jsx).
- [ ] Keep one consistent fetch path for search/sort/filter changes.
- [ ] Verify debounced search still works correctly.

Acceptance checks:

- [ ] One filter click triggers one API request.
- [ ] Search typing remains debounced.

### 13. Review lesson progress cache behavior

- [ ] Namespace lesson progress cache by authenticated user if local caching remains.
- [ ] Add expiry or invalidation rules for cached progress.
- [ ] Ensure stale local progress does not override fresher server state incorrectly.

Acceptance checks:

- [ ] Progress resume works correctly after account switch or content change.

## Low Priority Hardening Tasks

### 14. Improve modal and dialog accessibility

- [ ] Add Escape key handling to modal/dialog components.
- [ ] Add focus trapping and focus return behavior for checkout and logout dialogs.
- [ ] Verify keyboard-only use of modal close/confirm actions.

Acceptance checks:

- [ ] Modals are fully operable without a mouse.

### 15. Improve contact form resilience

- [ ] Add better validation and submission error UX in [`src/components/contact/ContactForm.jsx`](/Users/apple/Downloads/vk-user-web/src/components/contact/ContactForm.jsx).
- [ ] Prevent accidental double submit beyond button disabling.
- [ ] Consider success and retry states for slow backend responses.

Acceptance checks:

- [ ] Contact form gives clear feedback on slow failure and retry.

### 16. Revisit course listing UX

- [ ] Decide whether infinite scroll in [`src/components/course/AllCourses.jsx`](/Users/apple/Downloads/vk-user-web/src/components/course/AllCourses.jsx) should be real pagination or removed.
- [ ] Prevent “more content” illusion when only the first page is loaded.

Acceptance checks:

- [ ] Course list behavior matches actual data loading behavior.

## Deployment and Environment Tasks

### 17. Replace unstable backend environment configuration

- [ ] Replace DevTunnels API URL in [`.env`](/Users/apple/Downloads/vk-user-web/.env) with a stable production backend origin for production deployments.
- [ ] Split env configuration by environment if not already done.
- [ ] Confirm CORS, cookies, and auth session behavior in production domains.

Acceptance checks:

- [ ] Production frontend does not depend on a temporary tunnel URL.

### 18. Confirm build and asset assumptions

- [ ] Decide whether to keep `next/font/google` or self-host fonts for more deterministic builds.
- [ ] Verify production build behavior in CI/CD with the real network policy.
- [ ] Review whether loading Razorpay globally in [`src/app/layout.js`](/Users/apple/Downloads/vk-user-web/src/app/layout.js) should be replaced with route-level or on-demand loading.

Acceptance checks:

- [ ] Build is repeatable in CI.
- [ ] Non-payment pages do not unnecessarily depend on payment SDK loading.

## Suggested Execution Order

- [x] Task 1: Remove root auth blank screen
- [ ] Task 2: Replace client-owned auth/session model
- [ ] Task 3: Fix redirect recovery
- [ ] Task 4: Fix checkout reliability
- [ ] Task 5: Normalize auth API response handling
- [ ] Task 6: Guard refresh/direct access for auth step flows
- [ ] Task 7: Harden protected pages against stale auth
- [ ] Task 8: Fix remote image host config
- [ ] Task 9: Add route-level error/loading boundaries
- [ ] Task 10: Remove duplicate lesson/course fetches
- [ ] Task 11: Harden My Courses
- [ ] Task 12: Remove duplicate course filter requests
- [ ] Task 17: Replace unstable production env setup
- [ ] Task 18: Confirm build/deployment assumptions
- [ ] Task 13: Refine progress cache behavior
- [ ] Task 14: Improve modal accessibility
- [ ] Task 15: Improve contact form resilience
- [ ] Task 16: Revisit course list UX

## Final Pre-Launch Verification Checklist

- [ ] Login with password works on fresh load and after refresh.
- [ ] OTP login works across page reloads where expected.
- [ ] Signup works end-to-end with correct redirect behavior.
- [ ] Reset password works after direct refresh handling is added.
- [ ] Protected routes redirect correctly and cannot be bypassed with a fake cookie.
- [ ] Course detail page works after direct load and refresh.
- [ ] Paid checkout works after refresh and on slow network.
- [ ] Lesson watch page works with progress save/resume and no duplicate fetch thrash.
- [ ] My Courses handles success, empty, and error states correctly.
- [ ] Profile handles avatars from all supported hosts.
- [ ] Production build succeeds reliably.
- [ ] App remains usable on slow mobile devices without blank-first-paint behavior.
