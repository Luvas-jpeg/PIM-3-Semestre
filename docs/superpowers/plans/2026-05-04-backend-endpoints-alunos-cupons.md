# Backend Endpoints Alunos Cupons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove frontend mocks for students, promo codes, and product fallback by persisting them through the ASP.NET backend.

**Architecture:** Add `Student` and `PromoCode` entities to EF Core, expose CRUD controllers and promo validation/use endpoints, then extend the existing Vite API client and `AdminContext` facade. Keep current UI components and contracts stable.

**Tech Stack:** ASP.NET Core Web API, Entity Framework Core, Npgsql/PostgreSQL, React, Vite, TypeScript.

---

## File Structure

- Create `backend/Models/Student.cs`: persisted student entity matching the admin UI.
- Create `backend/Models/PromoCode.cs`: persisted promo code entity with validation fields.
- Modify `backend/Data/AppDbContext.cs`: register new DbSets and seed initial promo codes/students.
- Create `backend/Controllers/StudentsController.cs`: CRUD API for admin students.
- Create `backend/Controllers/PromoCodesController.cs`: CRUD, validation, and usage increment API.
- Add EF migration under `backend/Migrations/`: create database tables.
- Modify `frontend/src/app/lib/api.ts`: add students and promo code DTOs/API functions.
- Modify `frontend/src/app/context/AdminContext.tsx`: load products/students/promo codes from API and remove mocks/fallback.
- Modify `frontend/src/app/pages/Checkout.tsx`: await promo validation and increment usage through backend.
- Modify admin manager components only if TypeScript requires async handler adjustments.
- Modify docs only if build reveals README drift.

### Task 1: Backend Entities and DbContext

- [ ] Create `Student.cs` with properties `Id`, `Name`, `Email`, `Phone`, `CourseId`, `CourseName`, `EnrollmentDate`, `Status`.
- [ ] Create `PromoCode.cs` with properties `Id`, `Code`, `Discount`, `DiscountType`, `StartDate`, `EndDate`, `IsActive`, `UsageLimit`, `UsageCount`.
- [ ] Add `DbSet<Student>` and `DbSet<PromoCode>` to `AppDbContext`.
- [ ] Seed the existing three students and two promo codes in `OnModelCreating`.

### Task 2: Backend Controllers

- [ ] Create `StudentsController` with `GET`, `POST`, `PUT`, `DELETE`.
- [ ] Create `PromoCodesController` with `GET`, `POST`, `PUT`, `DELETE`, `GET validate`, and `POST {id}/use`.
- [ ] Validate required fields, allowed statuses, allowed discount types, date ranges, and duplicate promo codes.
- [ ] Use existing response style: `{ message = "..." }` for user-facing errors.

### Task 3: Migration

- [ ] Run `dotnet ef migrations add AddStudentsAndPromoCodes --project backend/backend.csproj`.
- [ ] Inspect migration to confirm only `Students` and `PromoCodes` tables plus seed data were added.

### Task 4: Frontend API Client

- [ ] Add `ApiStudent`, `ApiPromoCode`, mapping functions, `studentsApi`, and `promoCodesApi` to `frontend/src/app/lib/api.ts`.
- [ ] Keep frontend types from `AdminContext` stable.
- [ ] Ensure `validate` returns `PromoCode | null` for invalid/expired/exhausted code.

### Task 5: Frontend State Integration

- [ ] Remove import and fallback usage of `frontend/src/app/data/products.ts`.
- [ ] Initialize products, students, and promo codes as empty arrays.
- [ ] Load all three collections from backend in `AdminProvider`.
- [ ] Convert student and promo code mutations to async functions that call the API.
- [ ] Update `Checkout` to await promo validation and usage increment.

### Task 6: Verification

- [ ] Run `dotnet build backend/backend.csproj`.
- [ ] Run `npm run build` in `frontend`.
- [ ] Fix compile errors without widening scope.
- [ ] Leave changes uncommitted for review.
