export class ClienteServices{
    constructor({clienteModel, zodValidator, clienteSchema}){
        this.clienteModel = clienteModel;
        this.zodValidator = zodValidator;
        this.clienteSchema = clienteSchema;
    }

    
}