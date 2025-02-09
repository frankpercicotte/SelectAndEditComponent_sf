import { LightningElement, track } from 'lwc';

export default class SelectAndEditComponent extends LightningElement {
    @track selectedItem = '';
    @track inputValue = '';
    @track selectedItems = [];
    @track currentPage = 1;
    pageSize = 5; // Número de itens por página

    // Simulação de dados carregados de um JSON
    allItems = [
        { label: 'Tipo de PVD', value: 'Tipo de PVD' },
        { label: 'Taxa de Crédito', value: 'Taxa de Crédito' },
        { label: 'Taxa de Débito', value: 'Taxa de Débito' },
        { label: 'Taxa de Pix', value: 'Taxa de Pix' },
        { label: 'ITC', value: 'ITC' }
    ];

    // Opções disponíveis no Combobox (itens ainda não selecionados)
    get availableItems() {
        return this.allItems.filter(item => 
            !this.selectedItems.some(selected => selected.name === item.value)
        );
    }

    get totalPages() {
        return Math.ceil(this.selectedItems.length / this.pageSize);
    }

    get disablePrevious() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage >= this.totalPages;
    }

    get paginatedItems() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.selectedItems.slice(start, start + this.pageSize);
    }

    handleItemChange(event) {
        this.selectedItem = event.detail.value;
    }

    handleValueChange(event) {
        this.inputValue = event.target.value;
    }

    addItem() {
        if (this.selectedItem && this.inputValue) {
            const existingItem = this.selectedItems.find(item => item.name === this.selectedItem);
            if (existingItem) {
                // Atualiza item já existente
                existingItem.value = this.inputValue;
            } else {
                // Adiciona novo item à lista
                this.selectedItems = [
                    ...this.selectedItems,
                    {
                        id: this.selectedItems.length + 1,
                        name: this.selectedItem,
                        value: this.inputValue
                    }
                ];
            }
            this.selectedItem = '';
            this.inputValue = '';
        }
    }

    editItem(event) {
        const itemId = parseInt(event.currentTarget.dataset.id, 10);
        const item = this.selectedItems.find(entry => entry.id === itemId);
        if (item) {
            this.selectedItem = item.name;
            this.inputValue = item.value;
            this.selectedItems = this.selectedItems.filter(entry => entry.id !== itemId);
        }
    }

    removeItem(event) {
        const itemId = parseInt(event.currentTarget.dataset.id, 10);
        this.selectedItems = this.selectedItems.filter(entry => entry.id !== itemId);
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
}
