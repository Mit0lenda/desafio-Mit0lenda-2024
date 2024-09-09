class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: 3, especies: ['MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: 0, especies: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: 1, especies: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: 0, especies: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: 1, especies: ['LEAO'] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], tipo: 'carnivoro' },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], tipo: 'carnivoro' },
            CROCODILO: { tamanho: 3, bioma: ['rio'], tipo: 'carnivoro' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], tipo: 'herbivoro' },
            GAZELA: { tamanho: 2, bioma: ['savana'], tipo: 'herbivoro' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana e rio'], tipo: 'herbivoro' }
        };
    }

    validarAnimal(animal) {
        return this.animais.hasOwnProperty(animal);
    }

    analisaRecintos(animal, quantidade) {
        if (!this.validarAnimal(animal)) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        const infoAnimal = this.animais[animal];
        const espacoNecessario = infoAnimal.tamanho * quantidade;
        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espacoOcupado = 0;

            if (recinto.animaisExistentes > 0) {
                const tamanhoEspecieExistente = this.animais[recinto.especies[0]].tamanho;
                espacoOcupado = recinto.animaisExistentes * tamanhoEspecieExistente;
            }

            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            const biomaAdequado = infoAnimal.bioma.includes(recinto.bioma);

            if (biomaAdequado && espacoLivre >= espacoNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - espacoNecessario, // Subtrai o espaço necessário para os novos animais
                    descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`
                });
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
        recintosViaveis.sort((a, b) => a.numero - b.numero);
        return { erro: false, recintosViaveis: recintosViaveis.map(r => r.descricao) };
    }
}

export { RecintosZoo as RecintosZoo };
