class Api {
    static protocol = 'http'
    static domain = 'dcorpse.keenetic.pro'
    static port = '43340'

    static getLink() {
        return `${this.protocol}://${this.domain}:${this.port}`
    }
}
export default Api