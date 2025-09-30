<script lang="ts">
import { onMount } from 'svelte';
import type { Teacher, Student } from '$lib/types/UserData';
import DataService from '$lib/utils/DataService';
import { goto } from '$app/navigation';
import { sessionTeacherID } from '$lib/utils/stores/store';

let teachers: Teacher[] = [];
let teacherSearch = '';
let selectedTeacher: Teacher | null = null;

let classes: string[] = [];
let selectedClass: string | null = null;

// Helper: ensure 'All Students' (empty string) is present in classes
function ensureAllStudentsClass(classList: string[]): string[] {
  if (!classList.includes('')) {
    return ['', ...classList];
  }
  return classList;
}

let students: Student[] = [];
let studentSearch = '';


let isAdmin = false;
let teacher: Teacher | null = null;

// Fetch all teachers on mount
onMount(async () => {

    DataService.Data.fetchTeacherID()
        .then(async (res) => {
            $sessionTeacherID = res;
            teacher = await DataService.Teacher.getTeacher($sessionTeacherID);
            console.log('Teacher ID: ', $sessionTeacherID);

            DataService.Data.fetchIsTeacherAdmin()
                .then((result) => {
                    isAdmin = result;
                    if (isAdmin) {
                        console.log('Teacher is admin');
                    } else {
                        console.log('Teacher is not admin');
                        alert('You do not have admin access!');
                        goto('/teacher');
                    }
                })
                .catch((err) => {
                    console.error('Error checking if teacher is admin: ', err);
                    alert('You do not have admin access!');
                    goto('/teacher');
                });                
        })
        .catch((err) => {
            alert('You are not logged in!');
            goto('/teacher');
        });

    teachers = await DataService.Admin.getAllTeachers();
});

// When a teacher is selected, fetch their classes
async function selectTeacher(teacher: Teacher) {
  selectedTeacher = teacher;
  let fetchedClasses = await DataService.Teacher.getClasses(teacher.id);
  classes = ensureAllStudentsClass(fetchedClasses);
  selectedClass = '';
  students = [];
}

// When a class is selected, fetch its students
async function selectClass(className: string) {
  selectedClass = className;
  if (selectedTeacher) {
    if (className === '') {
      // Fetch all students for this teacher
      students = await DataService.Data.fetchStudents(selectedTeacher.id, false);
    } else {
      // Fetch students for the specific class (if you have such an endpoint, otherwise filter client-side)
      students = (await DataService.Data.fetchStudents(selectedTeacher.id, false)).filter(s => (s.class_name ?? '') === className);
    }
  }
}

// Filtered lists
$: filteredTeachers = teachers.filter(t =>
  (t.first_name + ' ' + t.last_name + ' ' + t.email).toLowerCase().includes(teacherSearch.toLowerCase())
);

$: filteredStudents = students.filter(s =>
  (s.first_name + ' ' + s.last_name).toLowerCase().includes(studentSearch.toLowerCase())
);
</script>

<div class="admin-browser p-6 border rounded bg-white shadow-md overflow-scroll">
  <h1 class="text-3xl font-bold mb-4">Admin: Teacher/Class/Student Browser</h1>

  <!-- Teacher Search and List -->
  <div>
    <input
      type="text"
      placeholder="Search teachers..."
      bind:value={teacherSearch}
      class="input input-bordered mb-2"
    />
    <ul class="teacher-list">
      {#each filteredTeachers as teacher}
        <li>
          <button class="btn btn-link" on:click={() => selectTeacher(teacher)}>
            {teacher.first_name} {teacher.last_name} ({teacher.email})
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Class List for Selected Teacher -->
  {#if selectedTeacher}
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">
        Classes for {selectedTeacher.first_name} {selectedTeacher.last_name}
      </h2>
      <ul class="class-list">
        {#each classes as className}
          <li>
            <button class="btn btn-outline" on:click={() => selectClass(className)}>
              {className === '' ? 'All Students' : className}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- Student List for Selected Class -->
  {#if selectedClass !== null}
    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-2">
        Students in {selectedClass === '' ? 'All Students' : selectedClass}
      </h3>
      <input
        type="text"
        placeholder="Search students..."
        bind:value={studentSearch}
        class="input input-bordered mb-2"
      />
      <ul class="student-list">
        {#each filteredStudents as student}
          <li>
            {student.first_name} {student.last_name}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
.admin-browser { 
    max-width: 800px; 
    margin: 2vh auto; 
    max-height: 80vh;
    overflow: scroll;
}
.teacher-list, .class-list, .student-list { list-style: none; padding: 0; }
.teacher-list li, .class-list li, .student-list li { margin-bottom: 0.5rem; }
</style>
