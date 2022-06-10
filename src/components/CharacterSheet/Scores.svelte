<script>
  export let strength = 0;
  export let agility = 0;
  export let presence = 0;
  export let toughness = 0;
</script>

<table class="score-table">
  <thead>
    <tr>
      <th>Strength</th>
      <th>Agility</th>
      <th>Presence</th>
      <th>Toughness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{strength}</td>
      <td>{agility}</td>
      <td>{presence}</td>
      <td>{toughness}</td>
    </tr>
  </tbody>
</table>

<style>
  .score-table {
    padding: 0;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    border-collapse: collapse;
    margin: 0;
  }
  .score-table td,
  .score-table th {
    width: 25%;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    text-align: center;
  }
</style>
