class Api {
    static protocol = 'https'
    static domain = 'dev.dcorpse.keenetic.pro'
    static port = ''

    static getLink() {
        const link = `${this.protocol}://${this.domain}`
        return this.port
            ? `${link}:${this.port}`
            : link
    }
}
export default Api