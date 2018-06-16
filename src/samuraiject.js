const PARAMS_MODE = {
  asConfigObject: 'asConfigObject',
  asIndividualParams: 'asIndividualParams'
}

const _isClass = (InstanceTemplate) => {
  return InstanceTemplate && InstanceTemplate.prototype && InstanceTemplate.prototype.constructor
}

const _createObjectParams = (dependencies, resolve) => {
  return Array.isArray(dependencies) ? dependencies.reduce((res, value) => {
    if (typeof value === 'string') {
      res[value] = resolve(value)
    } else {
      const [ namedParam ] = Object.keys(value).map(key => ({
        key,
        value: value[key]
      }))
      res[namedParam.key] = namedParam.value
    }
    return res
  }, {}) : dependencies
}

const _createInstanceWithInvidivualParams = (params, isClass, InstanceTemplate) => {
  const arrayOfParams = Object.keys(params).map(key => params[key])
  return isClass ? new InstanceTemplate(...arrayOfParams) : InstanceTemplate(...arrayOfParams)
}

const _createInstanceWithConfigParams = (params, isClass, InstanceTemplate) => {
  return isClass ? new InstanceTemplate(params) : InstanceTemplate(params)
}

const _createInstanceWithoutParams = (isClass, InstanceTemplate) => {
  return isClass ? new InstanceTemplate() : InstanceTemplate()
}

const Container = () => {
  const dependencies = []
  const register = (name, source, deps = [], mode = PARAMS_MODE.asConfigObject) => {
    dependencies.push({
      name,
      source,
      deps,
      mode
    })
  }
  const resolve = (depName) => {
    try {
      const dep = dependencies.find(({name}) => name === depName)
      if (!dep) throw new Error(`Dependency ${depName} not found`)
      const obj = _createObjectParams(dep.deps, resolve)
      const { mode, source: InstanceTemplate } = dep
      const isClass = _isClass(InstanceTemplate)
      if (mode === PARAMS_MODE.asIndividualParams) {
        return _createInstanceWithInvidivualParams(obj, isClass, InstanceTemplate)
      }
      if (Object.keys(obj).length > 0) {
        return _createInstanceWithConfigParams(obj, isClass, InstanceTemplate)
      }
      return _createInstanceWithoutParams(isClass, InstanceTemplate)
    } catch (err) {
      console.log(err)
      return null
    }
  }
  return { register, resolve }
}

module.exports = {
  Container,
  PARAMS_MODE
}
