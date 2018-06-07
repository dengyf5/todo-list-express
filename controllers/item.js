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

        this.sort = {
            id: 1
        }

        //bind this
        this.save = this.add = this.add.bind(this)
        this.del = this.delete = this.delete.bind(this)
        this.deleteByPattern = this.deleteByPattern.bind(this)
        this.deletes = this.deletes.bind(this)
        this.deletesByPattern = this.deletesByPattern(this)
        this.get = this.get.bind(this)
        this.getByProp = this.getByProp.bind(this)
        this.getByPattern = this.getByPattern.bind(this)
        this.gets = this.gets.bind(this)
        this.getsByPattern = this.getsByPattern.bind(this)
        this.exist = this.exist.bind(this)
        this.sortBy = this.setSort = this.setSort.bind(this)
        this.emply = this.emply.bind(this)
        this.update = this.update.bind(this)
        this.setId = this.setId.bind(this)
        this.getLastId = this.getLastId.bind(this)

        //set item
        if (data) {
            this.data = data
            this.item = this.model(data)
        }
    }

    setSort(prop, sort = 1) {
        if (typeof sort === typeof 1) {
            sort = sort >= 0 ? 1 : -1;
        }
        this.sort = {
            [prop]: sort
        };
        return this;
    }

    async add(data = null) {
        if (!data && !this.data) {
            throw new Error(`you have not declare the data!`)
        }
        if (data && this.data) {
            throw new Error(`the data has already existed!`)
        }
        if (data) {
            this.data = data
            this.item = this.model(data)
        }
        await this.setId(this.item)

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

    getByProp(prop, value, sort) {
        if (value) {
            return this.model.find().where(prop).equals(value).sort(sort || this.sort).exec()
        }
        return this.model.find().where(prop).sort(sort || this.sort).exec();
    }
    getsByPattern(pattern, sort = null) {
        return this.model.find(pattern).sort(sort || this.sort).exec();
    }

    gets(...ids) {
        return this.model.find().where('id').in(ids).sort(this.sort).exec();
    }

    update(id, item) {
        return this.exist(id).then(isExisted => {
            if (!isExisted) {
                throw new Error(`id:${id} does not exist`)
            }
            if (item.id) {
                throw new Error(`you can not change id`)
            }
            return this.get(id).then(data => data.update(item))
        })
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

    getLastId() {
        return this.model.find({}).sort({
            id: -1
        }).exec().then(datalist => {
            if (datalist.length === 0) {
                return 0
            }
            //console.log(datalist[0].id)
            return datalist[0].id
        })
    }

    async setId(item) {
        let id = await this.getLastId()
        item.id = +id + 1;
    }

}

export {
    Item,
    Item as
    default
}