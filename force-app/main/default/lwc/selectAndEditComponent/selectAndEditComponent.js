import { LightningElement, track } from 'lwc';

export default class SelectAndEditComponent extends LightningElement {
    @track selectedItem = '';
    @track inputValue = '';
    @track itemList = [];
    @track searchTerm = '';
    @track availableItems = [
        { label: 'Tipo de PVD', value: 'Tipo de PVD' },
        { label: 'Taxa de Crédito', value: 'Taxa de Crédito' },
        { label: 'Taxa de Débito', value: 'Taxa de Débito' },
        { label: 'Taxa de Pix', value: 'Taxa de Pix' },
        { label: 'ITC', value: 'ITC' },
        { label: 'Valor mínimo', value: 'Valor mínimo' },
        { label: 'Valor máximo', value: 'Valor máximo' },
        { label: 'Observação 1', value: 'Observação 1' },
        { label: 'Observação 2', value: 'Observação 2' },
        { label: 'Observação 3', value: 'Observação 3' },
        { label: 'Observação 4', value: 'Observação 4' }
    ];

    // Itens filtrados conforme o termo de pesquisa
    get filteredItems() {
        return this.availableItems.filter(item =>
            item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    handleItemChange(event) {
        this.selectedItem = event.detail.value;
    }

    handleValueChange(event) {
        this.inputValue = event.target.value;
    }

    addItem() {
        if (this.selectedItem && this.inputValue) {
            const newItem = {
                id: Date.now(),
                name: this.selectedItem,
                value: this.inputValue
            };

            // Adiciona o item no topo da lista
            this.itemList = [newItem, ...this.itemList];

            // Remove o item da lista de opções disponíveis
            this.availableItems = this.availableItems.filter(item => item.value !== this.selectedItem);

            // Reseta os campos
            this.selectedItem = '';
            this.inputValue = '';
            this.searchTerm = '';
        }
    }

    removeItem(event) {
        const idToRemove = event.currentTarget.dataset.id;
        const itemToRemove = this.itemList.find(item => item.id === parseInt(idToRemove, 10));

        if (itemToRemove) {
            // Adiciona o item de volta à lista de opções
            this.availableItems = [...this.availableItems, { label: itemToRemove.name, value: itemToRemove.name }];
            // Remove o item da lista de itens
            this.itemList = this.itemList.filter(item => item.id !== parseInt(idToRemove, 10));
        }
    }
}
