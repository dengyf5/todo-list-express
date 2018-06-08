import { config } from '../config'

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
        // if model is not definded, throw a error
        if (!model) {
            throw new Error(`require a model param`)
        }

        // initial this.model
        this.model = model
        // initial the way to sort
        this.sort = {
            id: 1
        }

        // bind methods with `this`
        this.save = this.add = this.add.bind(this)
        this.del = this.delete = this.delete.bind(this)
        this.deleteByPattern = this.deleteByPattern.bind(this)
        this.deletes = this.deletes.bind(this)
        this.deletesByPattern = this.deletesByPattern.bind(this)
        this.deletesByProp = this.deletesByProp.bind(this)
        this.get = this.get.bind(this)
        this.getsByProp = this.getsByProp.bind(this)
        this.getByPattern = this.getByPattern.bind(this)
        this.gets = this.gets.bind(this)
        this.getsByPattern = this.getsByPattern.bind(this)
        this.exist = this.exist.bind(this)
        this.sortBy = this.setSort = this.setSort.bind(this)
        this.emply = this.emply.bind(this)
        this.update = this.update.bind(this)
        this.setId = this.setId.bind(this)
        this.getLastId = this.getLastId.bind(this)

        // initial this.item
        if (data) {
            this.data = data
            this.item = this.model(data)
        }
    }

    /**
     * change the way to sort
     * 
     *
     * @param {string} prop
     * @param {number} [sort=1]
     * @returns {class} Item(this)
     * @memberof Item
     */
    setSort(prop, sort = 1) {
        if (typeof sort === typeof 1) {
            sort = sort >= 0 ? 1 : -1
        }
        this.sort = {
            [prop]: sort
        }
        return this
    }

    /**
     * save a item to database
     *
     * @param {object data} [data=null]
     * @returns {promise}
     * @memberof Item
     */
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
        }).catch(err => [err])

    }

    /**
     * delete a item with mongo pattern
     *
     * @param {object} pattern
     * @returns {promise}
     * @memberof Item
     */
    deleteByPattern(pattern) {
        return this.model.deleteOne(pattern).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * delete a item by item id
     *
     * @param {number} id
     * @returns {promise}
     * @memberof Item
     */
    delete(id) {
        return this.model.deleteOne({
            id
        }).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * delete items by pattern
     *
     * @param {object} pattern
     * @returns {promise}
     * @memberof Item
     */
    deletesByPattern(pattern) {
        return this.model.deleteMany(pattern).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * delelte items by item id
     *
     * @param {...number} ids
     * @returns {promise}
     * @memberof Item
     */
    deletes(...ids) {
        return this.model.deleteMany().where('id').in(ids).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * delete items by prop and its value
     *
     * @param {string} prop
     * @param {string | number} value
     * @returns {promise}
     * @memberof Item
     */
    deletesByProp(prop,value) {
        if(!(prop && value)) {
            throw new Error(`need prop value`)
        }
        return this.deletesByPattern({[prop]: value})
    }

    /**
     * get a item by pattern
     *
     * @param {object} pattern
     * @param {object} [sort=null]
     * @returns {promise}
     * @memberof Item
     */
    getByPattern(pattern, sort = null) {
        return this.model.findOne(pattern).sort(sort || this.sort).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * get a item by item id
     * 
     * @param {number} id
     * @returns {promise}
     * @memberof Item
     */
    get(id) {
        return this.model.findOne({
            id
        }).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * get items by a prop and value
     *
     * @param {string} prop
     * @param {string|number} value
     * @param {object} sort
     * @returns {promise}
     * @memberof Item
     */
    getsByProp(prop, value, sort) {
        if (value) {
            return this.model.find().where(prop).equals(value).sort(sort || this.sort).exec().then(res => [null,res]).catch(err => [err])
        }
        return this.model.find().where(prop).sort(sort || this.sort).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * get items by pattern
     *
     * @param {object} pattern
     * @param {object} [sort=null]
     * @returns {promise}
     * @memberof Item
     */
    getsByPattern(pattern, sort = null) {
        return this.model.find(pattern).sort(sort || this.sort).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * get items by id
     *
     * @param {...number} ids
     * @returns {promise}
     * @memberof Item
     */
    gets(...ids) {
        return this.model.find().where('id').in(ids).sort(this.sort).exec().then(res => [null,res]).catch(err => [err])
    }

    /**
     * update a item by its id
     *
     * @param {number} id
     * @param {object} item
     * @returns {promise}
     * @memberof Item
     */
    update(id, item) {
        return this.exist(id).then(isExisted => {
            if (!isExisted) {
                throw new Error(`id:${id} does not exist`)
            }
            if (item.id) {
                throw new Error(`you can not change id`)
            }
            return this.get(id).then(data => data.update(item))
        }).then(res => [null,res]).catch(err => [err])
    }

    /**
     * find whether a id existed
     * resolve a {boolern} value
     * @param {number} id
     * @returns {promise}
     * @memberof Item
     */
    exist(id) {
        return this.get(id).then((data) => {
            if (data) {
                return true
            }
            return false
        })
    }

    /**
     * emply the collection
     * only use by admin
     *
     * @returns {promise}
     * @memberof Item
     */
    emply() {
        return this.model.db.dropCollection(this.model.collection.collectionName).then(res => [null,res]).catch(err => [err])
    }

    /**
     * get the last id in the database
     *
     * @returns {promise}
     * @memberof Item
     */
    getLastId() {
        return this.model.find({}).sort({
            id: -1
        }).exec().then(datalist => {
            if (datalist.length === 0) {
                // id begin with (user custom)
                return config.db.idBeginWith
            }
            //console.log(datalist[0].id)
            return datalist[0].id
        })
    }

    /**
     * set this.item with the last id
     *
     * @param {object} item
     * @memberof Item
     */
    async setId(item) {
        let id = await this.getLastId()
        item.id = +id + 1
    }

}

export {
    Item,
    Item as
    default
}