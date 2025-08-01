<script lang="ts">
  import type { Student } from '$lib/types/UserData';

  export let newStudent: Student;
  export let onAdd: () => void;
  export let classes: string[] = [];
  export let selectedClass: string | null = null;

    function handleInput(e: Event, field: keyof Student) {
        const rawValue = (e.target as HTMLInputElement).value;
        
        switch (field) {
            case 'first_name':
                newStudent.first_name = rawValue;
                break;
            case 'last_name':
                newStudent.last_name = rawValue;
                break;
            case 'age':
                const ageValue = parseInt(rawValue);
                if (!isNaN(ageValue) && ageValue > 0 && ageValue <= 100) {
                    newStudent.age = ageValue;
                } else {
                    newStudent.age = 0; // Reset to 0 if invalid
                }
                break;
            case 'class_name':
                newStudent.class_name = rawValue;
                break;
        }
    }

</script>

<div class="flex w-3/4 space-x-2 rounded bg-gray-100 p-3 shadow">
  <input
    type="text"
    placeholder="First name"
    class="input input-bordered w-1/4"
    bind:value={newStudent.first_name}
    on:input={(e) => handleInput(e, 'first_name')} />
  <input
    type="text"
    placeholder="Last name"
    class="input input-bordered w-1/4"
    bind:value={newStudent.last_name}
    on:input={(e) => handleInput(e, 'last_name')} />
  <input
    type="number"
    placeholder="Age"
    class="input input-bordered w-1/6"
    bind:value={newStudent.age}
    min="1"
    max="100"
    on:keypress={
      (e) => {
        if (
          e.key !== 'Backspace' &&
          e.key !== 'Delete' &&
          e.key !== 'ArrowLeft' &&
          e.key !== 'ArrowRight'
        ) {
          if (isNaN(Number(e.key)) || e.key === ' ') {
            e.preventDefault();
          }
        }
      }
    }
    on:input={(e) => handleInput(e, 'age')} />
  <select
    class="select select-bordered w-1/4"
    bind:value={newStudent.class_name}
    on:change={(e) => handleInput(e, 'class_name')}>
    <option value="" selected={selectedClass === null}>No class</option>
    {#each classes as c}
      <option value={c} selected={selectedClass === c}>{c}</option>
    {/each}
  </select>
  <div class="ml-auto">
    <button class="btn btn-primary" on:click={onAdd}>Add student</button>
  </div>
</div>
