<script type="ts">
  export let alt: string = "";
  export let src: string = "";
</script>

<figure class="portrait"><img {src} {alt} width="50" height="50" /></figure>

<style>
  .portrait {
    margin: 0 0.5rem 0 0;
  }
</style>
