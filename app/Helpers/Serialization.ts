export default class Serialization {
  public static stringToJson(value: string): Object {
    try {
      return JSON.parse(value)
    } catch {
      return JSON.parse(JSON.stringify(value))
    }
  }

  public static cleanUpArrayString(
    value: Array<any> | string | String,
    appendComa: boolean = false
  ): string {
    /*
      This method is similar to Array.prototype.join,
      except that it removes all unessential whites spaces and
      it also can operate on stringfied arrays.

      EX: '["jhon", "doe"]' (Stringfied array)
      EX: ["jhon", "doe"] (Actual array)'

      Both of these is gonna be converted to a string like 'jhon, doe'
    */
    let newValue

    if (typeof value === 'string') {
      newValue = String(value)
    } else {
      newValue = Array(value).join(',')
    }

    newValue = this.trimArrayString(newValue)
    if (appendComa) {
      newValue = newValue.slice(-1) === ',' ? newValue : newValue + ','
    }

    return newValue
  }

  public static trimArrayString(arrayString: string | String): string {
    return arrayString.replaceAll(/\["|\['|\"]|\']|"|'| |\{|}/g, '')
  }
}
