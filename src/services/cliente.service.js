export class ClienteServices{
    constructor({clienteModel, zodValidator, clienteSchema}){
        this.cliente = clienteModel;
        this.validator = zodValidator;
        this.schema = clienteSchema;
    }

    
}