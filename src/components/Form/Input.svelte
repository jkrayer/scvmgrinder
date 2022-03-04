<script>
  export let type = 'text';
  export let label;
  export let name;
  export let value;
  export let readonly = false;
  export let onChange = () => {}
</script>

<label for={name}>{label}</label>
<input {type} {name} id={name} value={value} on:input={onChange} readonly={!!readonly} />
<slot></slot>
