const algorithm = "aes192";
const password = "1qaZxsw2@3edcVfr4";
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDT7bNp4m8lhFoU/pxJCDFHOiTX18pqxQQzxrIlJjKk+KFJM4HO
N2n4wC4bYwsS/Zn4XTTQZSgU3aPSRYW4O14pEHJmlAKR26TN4lkQ526oWn0XXuj2
jWEJG3iH6VoiojszZqeN5jIbvjNFfIsKvvYQWeG6HKHF0lb8l/M9MQSYOwIDAQAB
AoGBAIq/1jXdnL0oUL3sEDA0X+btJ0/1JL4QbPblAJ8XyhJ+AUJmqXZ0iznjwIwH
pSlyxYp4o2pIwBwhG+8/uxNqMvNoi5h6DFDchd4MRMNBH05Wareg6bcLdMhtGAGn
voS3shMz+nIU3LTLaRoSCza3oybBfMNPqbR2BBsbSeaNZMuZAkEA7v5BudTfwcKS
41nH7dgvlwSpmG94xYh1ZTdBXoWZyyoV3mJVcjmywhM8zfvT4hcqIyLW2pBc4Zs+
twLOkTOgJwJBAOMCaA9RAV8ejaE7AvEvCqS8udAuCmO8p60cpLYcANEnyEQqhso3
QAx6ySy6ohd3qRKJ2onkLxX+/oEYUwo2f80CQC48hGy2UV/EC/TuHq7WH0bhQQpb
rorQvp2JVh06Tamvh7GRZqSFox7G6AGV0cUw5BcOG3EHcuC2zyhK47nVugsCQGLN
bVUdQKeRuLrv4Dvw6YUBzy3YnBUEy0YBLX9FeOWPlw50I+5nVa0Y0+5v3JSyNBgp
f8B8XDIKpeKyH5JWXhECQFd9Q5cJW8RUDKhH9HfyEUTghUmXB1FIagcNBXDpaoLE
tJdS6abUWpTiX09eUIcd/Wov3QJdZBbVIvUrmusBSdo=
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN CERTIFICATE-----
MIIBzTCCATYCCQDKHw2Q4r1gNDANBgkqhkiG9w0BAQUFADArMQswCQYDVQQGEwJV
QTENMAsGA1UECAwEa3lpdjENMAsGA1UEBwwEa2lldjAeFw0xOTEwMDIyMDAxMjNa
Fw0xOTExMDEyMDAxMjNaMCsxCzAJBgNVBAYTAlVBMQ0wCwYDVQQIDARreWl2MQ0w
CwYDVQQHDARraWV2MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDT7bNp4m8l
hFoU/pxJCDFHOiTX18pqxQQzxrIlJjKk+KFJM4HON2n4wC4bYwsS/Zn4XTTQZSgU
3aPSRYW4O14pEHJmlAKR26TN4lkQ526oWn0XXuj2jWEJG3iH6VoiojszZqeN5jIb
vjNFfIsKvvYQWeG6HKHF0lb8l/M9MQSYOwIDAQABMA0GCSqGSIb3DQEBBQUAA4GB
AGa0Ypy5Z0bfCpsCUY3B+JMv0nOkCqKU/OtXlWwpXlBb88V3j/W3wKYMn0upPtP5
5kduPWQTZOAzRtxOOBvMPuYN9NQIaR6oV1OfX+4yfAWiQRVEt34eEPyI+Vgw6bWo
VCNA36X1OGpC++dqwfo7kfodMuC5clmAEwBrlwHX0PFl
-----END CERTIFICATE-----
`;

module.exports = { algorithm, password, privateKey, publicKey };
