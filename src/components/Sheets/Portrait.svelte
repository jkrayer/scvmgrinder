<script type="ts">
  type Image = {
    width: number;
    height: number;
    src: string;
    alt: string;
  };

  export let name: string;
  export let image: Image = {
    width: 50,
    height: 50,
    src: "",
    alt: "",
  };
</script>

<figure class="sheet-image"><img alt={name} {...image} /></figure>

<style>
  .sheet-image {
    margin: 0 1em 0 0;
  }
</style>
