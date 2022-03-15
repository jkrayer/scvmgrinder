<script>
    import { setNewCharacter } from '../stores/Settings';
</script>

<div id="welcome">
    <p>A browser based character sheet for<wbr> MÖRK BORG.</p>
    <p><button type="button" class="theme-white-button" on:click={setNewCharacter}>Get Started</button></p>
    <img src="images/CompWith_MORKBORG_vert.svg" alt="Compatible with MÖRK BORG" />
</div>

<style>
#welcome {
    max-width: 400px;
    padding: var(--small-padding);
    margin: 0 auto;
    text-align: center;
}
</style>