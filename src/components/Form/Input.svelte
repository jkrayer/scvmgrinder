<script>
  export let type = 'text';
  export let label;
  export let name;
  export let value;
</script>

<label for={name}>{label}</label>
<input {type} {name} id={name} value={value} />
<slot></slot>
