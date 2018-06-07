/**
 * return a document object 
 * with some method like save...
 * 
 * @param model,[data]
 * 
 * @class Item
 */
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

        this.sort = {
            id: 1
        }

        //bind this
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.deleteByPattern = this.deleteByPattern.bind(this)
        this.deletes = this.deletes.bind(this)
        this.deletesByPattern = this.deletesByPattern(this)
        this.get = this.get.bind(this)
        this.getByPattern = this.getByPattern.bind(this)
        this.gets = this.gets.bind(this)
        this.getsByPattern = this.getsByPattern.bind(this)
        this.exist = this.exist.bind(this)
        this.setSort = this.setSort.bind(this)
        this.emply = this.emply.bind(this)
    }

    setSort(prop,sort) {
        if(typeof sort === typeof 1) {
            sort >= 0 ? 1 : -1;
        }
        this.sort = {
            [prop]: sort
        };
        return this;
    }
    add(data = null) {
        if (data && this.data) {
            throw new Error(`the data has already existed`)
        }
        if (data) {
            this.item = this.model(data)
        }

        let id = this.item.id

        return this.exist(id).then(isExisted => {
            if (isExisted) {
                throw new Error(`id:${this.item.id} has already existed`)
            }
            return this.item.save()
        })

    }

    deleteByPattern(pattern) {
        return this.model.deleteOne(pattern).exec()
    }

    delete(id) {
        return this.model.deleteOne({
            id
        }).exec()
    }

    deletesByPattern(pattern) {
        return this.model.deleteMany(pattern).exec();
    }

    deletes(...ids) {
        return this.model.deleteMany().where('id').in(ids).exec();
    }

    getByPattern(pattern, sort = null) {
        return this.model.find(pattern).sort(sort || this.sort).exec();
    }

    get(id) {
        return this.model.findOne({
            id
        }).exec();
    }

    getsByPattern(pattern, sort = null) {
        return this.model.find(pattern).sort(sort || this.sort).exec();
    }

    gets(...ids) {
        return this.model.find().where('id').in(ids).sort(this.sort).exec();
    }

    exist(id) {
        return this.get(id).then((data) => {
            if (data) {
                return true
            }
            return false
        })
    }

    emply() {
        return this.model.db.dropCollection(this.model.collection.collectionName)
    }

}

export {
    Item,
    Item as
    default
}