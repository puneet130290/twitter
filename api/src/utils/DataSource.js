const mongoose = require('mongoose')

class MongoDataSource {
  constructor() {
    this.Schema = mongoose.Schema
  }

  initialize(config) {
    this.context = config.context
    const { name, schema } = this.model
    this.Model = this.modelAreadyDeclared(name)
      ? mongoose.model(name)
      : new mongoose.model(
          name,
          new mongoose.Schema(schema, { timestamps: true })
        )
  }

  modelAreadyDeclared(name) {
    try {
      mongoose.model(name)
      return true
    } catch (error) {
      return false
    }
  }

  async bulkCreate(list) {
    try {
      const result = await this.Model.insertMany(list)
      return result
    } catch (error) {
      throw error
    }
  }

  async create(value) {
    try {
      const model = new this.Model(value)
      let result = await model.save()
      result = result.toJSON()
      result = result.toJSON()
    } catch (error) {
      throw error
    }
  }

  async update(value) {
    try {
      const { id, ...rest } = value
      const _id = value._id || id
      let result = await this.Model.findOneAndUpdate(
        { _id },
        { ...rest },
        { new: false }
      )
      return { ...result, id }
    } catch (error) {
      throw error
    }
  }

  async save(value) {
    try {
      if (value.id) {
        value._id = value.id
      }
      if (!value._id) {
        delete value._id
      }
      let model = new this.Model(value)
      if (value._id) {
        model.isNew = false
      }
      let result = await model.save()
      result = result.toJSON()
      return { ...result, id: result._id }
    } catch (error) {
      throw error
    }
  }

  async find(condition, projection) {
    try {
      let results = []
      let selection = this.getSelection(projection)
      if (selection) {
        results = condition
          ? await this.Model.find(condition).select(selection)
          : await this.Model.find().select(selection)
      } else {
        results = condition
          ? await this.Model.find(condition)
          : await this.Model.find()
      }
      return this.getDataValues(results)
    } catch (error) {
      throw error
    }
  }

  async findById(id, projection) {
    try {
      let result = null
      let selection = this.getSelection(projection)
      if (selection) {
        result = await this.Model.findById(id).select(selection)
      } else {
        result = await this.Model.findById(id)
      }
      result = result.toJSON()
      return { ...result, id: result._id }
    } catch (error) {
      throw error
    }
  }

  async deleteOne(filter) {
    try {
      const result = await this.Model.deleteOne(filter)
      return {
        success: true,
        message: 'Successfully Deleted',
      }
    } catch (error) {
      throw error
    }
  }

  async deleteMany(filter) {
    try {
      const result = await this.Model.deleteMany(filter)
      return {
        success: true,
        message: 'Successfully Deleted',
      }
    } catch (error) {
      throw error
    }
  }

  //private methods
  getSelection(projection) {
    try {
      let selection = null
      if (projection && projection.length > 0) {
        selection = projection.reduce((agg, field) => {
          agg = { ...agg, [field]: 1 }
          return agg
        }, {})
      }
      return selection
    } catch (error) {
      throw error
    }
  }

  getDataValues(results) {
    try {
      return results.map(result => {
        return { ...result.toJSON(), id: result._id }
      })
    } catch (error) {
      throw error
    }
  }
}

module.exports = MongoDataSource
