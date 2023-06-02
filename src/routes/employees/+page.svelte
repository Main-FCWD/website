<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;


  // Filter the 'staff' data based on 'department' value
  const billingDept = data.staff.filter(row => row.department === 'Billing');
  const distributeDept = data.staff.filter(row => row.department === 'Distribution');
  const maintainDept = data.staff.filter(row => row.department === 'Maintenance');
</script>

<article style="margin-top:5rem">

<header>
    <h1 style="text-align: left;">Employee Information</h1>
</header>

<!-- Primary -->
<details>
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <summary role="button">Billing Staff</summary>
    <table role="grid">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Number</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
            {#each billingDept as row}
          <tr>
            <td>{ row.name }</td>
            <td>{ row.position }</td>
            <td>{ row.number }</td>
            <td>{ row.email }</td>
          </tr>
            {/each}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
  </details>
  
  <!-- Secondary -->
  <details>
    <summary role="button" class="secondary">Distribution Staff</summary>
    <table role="grid">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Number</th>
            <th scope="col">Email</th>
            <th scope="col">Truck #</th>
          </tr>
        </thead>
        <tbody>
            {#each distributeDept as row}
          <tr>
            <td>{ row.name }</td>
            <td>{ row.position }</td>
            <td>{ row.number }</td>
            <td>{ row.email }</td>
            <td>{ row.truckid }</td>
          </tr>
            {/each}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
  </details>
  
  <!-- Contrast -->
  <details>
    <summary role="button" class="contrast">Maintence Staff</summary>
    <table role="grid">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Number</th>
            <th scope="col">Email</th>
            <th scope="col">Truck #</th>
          </tr>
        </thead>
        <tbody>
            {#each maintainDept as row}
          <tr>
            <td>{ row.name }</td>
            <td>{ row.position }</td>
            <td>{ row.number }</td>
            <td>{ row.email }</td>
            <td>{ row.truckid }</td>
          </tr>
            {/each}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
  </details>
</article>