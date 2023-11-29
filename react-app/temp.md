<Route path="faculties" element={<FacultiesPage />} />
<Route path="faculties/:id" element={<FacultyPage />}>
<Route index element={<FacultyDescription />} />
<Route path="description" element={<FacultyDescription />} />
<Route path="history" element={<FacultyHistory />} />
</Route>
