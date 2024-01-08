import * as fs from 'fs';

const vault = require("node-vault");


class VaultModule {
    private vaultClient: any;
    private readonly vaultRole: string
    private isKubelogged: boolean

    constructor(vaultRole: string) {
        this.vaultClient = vault({
            apiVersion: 'v1',
            endpoint: "http://vault.vault-dev.svc:8200",
        });
        this.vaultRole = vaultRole
        this.isKubelogged = false
    }

    async readSecret(path: string): Promise<any> {
        const JWT_TOKEN_FILE="/var/run/secrets/kubernetes.io/serviceaccount/token";
        const jwt = fs.readFileSync(JWT_TOKEN_FILE);

        if (!this.isKubelogged) {
            try {
                const result = await this.vaultClient.kubernetesLogin({
                "role": this.vaultRole,
                "jwt": jwt.toString()
            });
                this.vaultClient.token = result.auth.client_token;
            } catch (error) {
                console.error('Error authenticating to vault instance:', error);
                throw error;
            }
            this.isKubelogged = true
        }
        try {
            const res = await this.vaultClient.read(path);
            let obj = Object.keys(res.data.data)
            return res.data.data[obj[0]]
        } catch (error) {
            console.error('Error reading secret:', error);
            throw error;
        }
    }
}

export default VaultModule;
