<script>
    import character from '../../stores/Character'
</script>

<div id="character-header">
    <img src={$character.img} alt={$character.name} width="55" height="55" />
    <header>
        <h1 class="h1">{$character.name}</h1>
        <h2 class="h2">{$character.className}</h2>
    </header>
    <div class="right">
        <button class="b">Omens</button>
        <button class="b">Powers</button>
        <!-- <button>Rest</button>
        <button>Get Better</button> -->
    </div>
</div>

<style>
#character-header {
    display: flex;
    align-items: center;
    padding: .5em;
    background-color: yellow;
}

#character-header > img {
    padding-right: .5em;
}

.right {
    flex-grow: 1;
    text-align: right;
}

.h1 {
    margin: 0;
    font-family: Athelas, Cambria, serif;
    font-size: 2rem;
    line-height: .8;
}
.h2 {
    margin: 0;
    text-align: center;
    font-family: Athelas, Cambria, serif;
    font-size: 1rem;
    line-height: 1;
}
.b {
    margin: 0;
}
</style>