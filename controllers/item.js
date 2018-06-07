class Item {
    constructor(model, data) {
        if (!model) {
            throw new Error(`require a model param`)
        }
        this.model = model;
        if (data) {
            this.item = model(data)
            this.data = data
        }

        //bind this
        this.save = this.save.bind(this);
    }

    /**
     * save a item to database
     * and return a promise
     *
     * @returns Promise
     * @memberof Item
     */
    save() {
        return new Promise((resolve, rejects) => {
            this.item.save(err => {
                    if(err){
                        rejects(err)
                    }
                    resolve()
            })
        })
    }


    delete(item) {
        return new Promise((resolve, rejects) => {
            this.model.deleteOne(item, err => {
                if(err){
                    rejects(err)
                }
                    resolve(item);
            })
        })
    }

    deleteById(id) {
        return new Promise((resolve, rejects) => {
            this.model.deleteOne({
                id,
            }, err => {
                if(err){
                    rejects(err)
                }
                    resolve()
            })
        })
    }

    get(item) {
        return new Promise((resolve, rejects) => {
            this.model.find(item, (err, docs) => {
                if(err){
                    rejects(err)
                }
                resolve(docs)
            })
        })
    }

    getById(id) {
        return new Promise((resolve,rejects) => {
            this.model.find({id}, (err, docs) => {
                if(err){
                    rejects(err)
                }
                resolve(docs)
            })
        })
    }


}

export {Item, Item as default}