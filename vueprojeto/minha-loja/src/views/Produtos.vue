<template>
    <div class="produtos-container">
        <div class="header">
            <h1>Gerenciar produtos</h1>
            <button @click="showform = true" class="btn-primary">
                Novo Produto
            </button>
            <button @click="logout" class="btn-secundary">
                Sair
            </button>
        </div>

        <!-- Modal de Editar/Cadastrar -->
        <div v-if="showform" class="modal">
            <div class="modal-content">
                <h3>{{ editingProduct ? 'Editar' : 'Novo' }}</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="">Nome</label>
                        <input type="text" v-model ="form.nome" required />
                    </div>
                    <div class="form-group">
                        <label for="">Preco R$</label>
                        <input type="number" v-model ="form.preco" required step="0.01"/>
                    </div>
                    <div class="form-action">
                       <button type="submit">Salvar</button>                        
                       <button type="button" @click="cancelForm">Cancelar</button>                        
                    </div>
                </form>
            </div>
        </div>

        <!-- Lista de Produtos -->

        <div class="produtos-list">
            <div v-if="loading" class="loading">Carregando...</div> <!-- Se a pagina estiver carregando só mostrará a msg "Carregando..." -->
            <div v-else-if="produtos.length===0" class="empty"> Nenhum produto encontrado</div>
            <div v-else class="produtos-grid">
                <div
                    v-for="produto in produtos"
                    :key="produto._id"
                    class="produto-card"
                    >
                    <h3>{{ produto.nome }}</h3>
                    <p class="preco">R$ {{ produto.preco }}</p>

                    <div class="card-actions">
                        <button @click="editarProdutos(produto)" class="btn-edit">Editar</button>
                        <button @click="deletarProduto(produto._id)" class="btn-delete">Deletar</button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    name='Produtos',
    data(){
        return(
            showForm:false,
            editingProduct: null,
            form: {nome:"",preco:""}
        )
    },
    computed:{
            ...mapGetters({
                produtos: 'produtos/produto',
                loading: 'produtos/loading',
                error: 'produtos/error'
            })
    },
    // Antes de montar o html vai rodar o mountend
    async mounted(){
        await this.$store.dispath('produtos/fetchProdutos')
    },
    methods:{
        async handleSubmit(){
            const action = this.editingProduct ? 'produtos/updateProduto' : 'produtos/createProdutos' //
            const data = this.editingProduct ? 
                            { ...this.form, _id : this.editingProduct._id}:
                            this.form;

            const result = await this.$store.dispath(action,data)

            if(result.success){
                this.cancelForm
            } else {
                alert(result.message)
            }
        },
        editarProdutos(produto){
            this.editingProduct = produto
            this.form = { ...produto} 
            this.showForm = true
        },
        async deletarProduto(id){
            if(confirm('Tem certeza que deseja deletar?')){
                const result = await this.$store.dispath('produtos/deletarProduto',id)
                alert(result.message)
            }
        },
        cancelForm(){
            this.editingProduct = null
            this.form = { nome:"",preco:''} 
            this.showForm = false
        },
        logout(){
            this.$store('auth/logout')
            this.$router.push('/login')
        }
    }
}
</script>

<style>
.produtos-container{
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.header{
    display: false;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.btn-primary{
    background-color: blue;
    color: white;
    padding: 0.05rem 1rem;
    border:  none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-secundary{
    background-color: #6c757d;
    color: white;
    padding: 0.05rem 1rem;
    border:  none;
    border-radius: 4px;
    cursor: pointer;
}

.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0 ,5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* falta coisa aqui */
.modal-content{
    background-color: white;
    padding: 2rem;
    /* border-radius: ; */
}

.form-group{
    margin-bottom: 1rem;
}

.form-actions{
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.produtos-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill,mimmax(300px,1fr));
    gap: 1rem;
}

.produto-card{
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background-color: white;
}

/* Falta coisa aqui */
.preco{
    font-size: 1.2rem;
    /* font-weight: ; */
}

.card-action{
    display: flex;
    gap: 0.5rem;
}

.btn-edit{
    background-color: green;
    color: white;
    padding: 0.25rem 0.5rem;
    border:  none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-delete{
    background-color: red;
    color: white;
    padding: 0.25rem 0.5rem;
    border:  none;
    border-radius: 4px;
    cursor: pointer;
}

.loading, .empty{
    text-align: center;
    padding: 2rem;
    color: #666;
}

</style>