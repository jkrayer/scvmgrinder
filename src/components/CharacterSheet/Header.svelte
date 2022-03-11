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
    width: 150px;
    margin: 0;
    font-family: Athelas, Cambria, serif;
    font-size: 1.5rem;
    line-height: .8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.h2 {
    margin: 0;
    font-family: Athelas, Cambria, serif;
    font-size: .875rem;
    line-height: 1;
}
.b {
    margin: 0;
}
</style>