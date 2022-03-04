<script>
  export let type = 'text';
  export let label;
  export let name;
  export let value;
  export let readonly;
  export let onChange = () => {}

  console.log(9, readonly)
</script>

<label for={name}>{label}</label>
<input {type} {name} id={name} value={value} on:input={onChange} readonly={!!readonly} />
<slot></slot>
