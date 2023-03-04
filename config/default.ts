export default {
    port: 80,
    dbUri: 'mongodb+srv://len:8ZHT4Yvz66hNfCYe@cluster0.zwqbich.mongodb.net/?retryWrites=true&w=majority',
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    accessTokenPrivateKeyEncoded: `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWFFJQkFBS0JnUUM1MUxFRDQ4NVNkQWoyNmRDeHExSitWdlk1TlJtVStGYnhpaENJUVpWZlRWUlk5dExqCkVrSWpSWTUxTEVNSTBkRnFvVWQ1ZEczTFh2dEVSblpFT3VsSlNabnBrZ0xTZEtSN2tzbDdkdjg4Y1BTcmNZVmIKVkVMUXJobzdBYk91UzhWQmNrZGU3dnpGQThaOXZrSjVmWXEzcExPUjUrMmc2VmJ5Tll4Rm9mVTBId0lEQVFBQgpBb0dBU2xYeW1ZTy9QT3g5eVlldW0rUFVsQVZsYVd6OFZzTWd4RzVlUHFNOWhXb0JtN1RnbDBUdWYvMkxCd1ExCnJJbUNKQTF2OGYzSkRkbG8yZDcxNEVWUW0vajRTUzFCakNDMENiUFpGR1lPYmJQVnVGYytiK1VOUjdYa3pwOHYKNlBBYmhoMHMwbE1JaEIzTVNvSUQzQnlWTSsxa2svVFpoRUVlZTJiSThCK3lqY0VDUVFEeS94MkJzc0lGcEJCbQpGV1BVbmhROGEwUnhGMjhqeDBOQm5mWWpESVI4bm1ldFhPR2NKeU1XSlpRWFJXbDB3WktyRGpYMmIrZ2V1S3dHCjBDS1grUytkQWtFQXc4WnlBOTF5dzlhdHovS1dDcEIyRWFsa0VCQzd6SVF0WWcwalVURUxWNVdRZkZCSS9BUGoKVk5KSUhiOUpyc2REdXEwVWN3b0QxdHM5N2JKTjY3bkw2d0pBVVFBRmYvUnNoS0RaN28xMng2c2lKN25DQ01pOAovWG93eXpDeW1hQlVrWTNrRlgvK25LVFhKMHpEZnJaZW50TGY1ekZIZjZ4eC9idWxiR2Y1QUJ2S2FRSkJBSnljCkFOVUtyeVh1Yy9obmJKTmk0TEJjT3dtRytWUXZZRWFSai9FQk5MdUpqNTJDYy8vMTlFTUVQR0JmaDBmamExREgKNkJYbXF3K1RMc1VZMzdCMFhxVUNRUUN6blZ1R3dQMGc2OHZNd3M5QzZxemJKRFF6NUxPMm91WmRvYzJxdWdvdApkTFkrUGt0Y2RuOXo2TFYyMEpSL1JkYnpLbFVLenlUSEZqTmdxTzhXdkVrbAotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==`,
    accessTokenPublicKeyEncoded: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDNTFMRUQ0ODVTZEFqMjZkQ3hxMUorVnZZNQpOUm1VK0ZieGloQ0lRWlZmVFZSWTl0TGpFa0lqUlk1MUxFTUkwZEZxb1VkNWRHM0xYdnRFUm5aRU91bEpTWm5wCmtnTFNkS1I3a3NsN2R2ODhjUFNyY1lWYlZFTFFyaG83QWJPdVM4VkJja2RlN3Z6RkE4Wjl2a0o1ZllxM3BMT1IKNSsyZzZWYnlOWXhGb2ZVMEh3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==`,
    refreshTokenPrivateKeyEncoded: `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWEFJQkFBS0JnUUNvUzFhL2xpcEQ0OTNIQmM1czJISlg1bExFRmRoVmt5Q0RZS0hpNTFnNnNyZ2RKL3lXCi9weDVkcEJZc2E1dnRmQ1Mxa0YrOTBFd2VmWWN3R0lHTGxkQlN5VFR2MkR0WWpjYkRQdWMzb3EyVE9MRWFPdE8KUEZqcFVtcDlEYTJZaFdUYm93L21GQWdiOWE1UUgzU2pwTUZjZWQzS1BRUCtaYnF3VUdaZGxtYXJvUUlEQVFBQgpBb0dBYkM4cUQ3U25iTWNCWFJ3VmE1RGtTQzhPUzNERGhaY3prbUMvRUU2cFArcDlRbmplL2Uya2hzdzUxRm84CkNTSExDWWxqeHd1SXczSFRUUDQ2eFVCcTQ4cFVlNGNxUkFjZy8vVVF5WUJzbjRUZmo4VWZsU25vNzZEU2o2TUUKRFBxdmNQczFVT3hsT2lsUkJibkFuUFl1REo5bytkMEFCbDR3dE0wMzZ5cTZNTlVDUVFEVE5XUFJnUVloZUd1UQpFYUZia0NyQzZUL0VkV0hRNWJ5dG1BRm1ZdHdxU2oyd3dYRnlwQ1p6SmRKbmVhMjBFZDJDMXAvd21XNmZaeWk4CnA0ZVdqWDlUQWtFQXkvd2RJMVRkTXluZW9yeDBEU1duRXpJRk1idVc5anorRE5WeUVzT2QrWC9kN0QyQVN3cWIKRG9sTWpHUVgzMzZ0anExckxCSkN2QTV4OEZ3M2hMZHV1d0pBVDdId3BVZnpJVVFJQ2tlc3hCa0ZHYURicit5Kwo2UTBYQWNXK21YeXFLTWIwdWpKejlWY2RMd3ZSZGJ3RElGUXhha0pEL1l4WG9veFJZY1l4TWt6WUF3SkFVVllSCitFaWFleEF5NmdqaTdXc2FGNWxXWU9JLzY2ZWVWVmUyeUt5ZmpTRGpTSk90V0Q2K1hTbDZFSERJNUNFSzYxMVMKNHB2VmFFOEtONkZOc2VuQ2lRSkJBSXV5d0lsTjFXdVg3czhVUkRsVzNZMnluYTVwRkZQQmNTdmZuU2dZcTl1aApjRXN6N3ZKMFJxUDZ4dUp6cjNMMGlOdWJuSU1ER3dLQXJ6ek5neVZHZEFVPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==`,
    refreshTokenPublicKeyEncoded: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDb1MxYS9saXBENDkzSEJjNXMySEpYNWxMRQpGZGhWa3lDRFlLSGk1MWc2c3JnZEoveVcvcHg1ZHBCWXNhNXZ0ZkNTMWtGKzkwRXdlZlljd0dJR0xsZEJTeVRUCnYyRHRZamNiRFB1YzNvcTJUT0xFYU90T1BGanBVbXA5RGEyWWhXVGJvdy9tRkFnYjlhNVFIM1NqcE1GY2VkM0sKUFFQK1picXdVR1pkbG1hcm9RSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==`,
    accessTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC51LED485SdAj26dCxq1J+VvY5NRmU+FbxihCIQZVfTVRY9tLj
EkIjRY51LEMI0dFqoUd5dG3LXvtERnZEOulJSZnpkgLSdKR7ksl7dv88cPSrcYVb
VELQrho7AbOuS8VBckde7vzFA8Z9vkJ5fYq3pLOR5+2g6VbyNYxFofU0HwIDAQAB
AoGASlXymYO/POx9yYeum+PUlAVlaWz8VsMgxG5ePqM9hWoBm7Tgl0Tuf/2LBwQ1
rImCJA1v8f3JDdlo2d714EVQm/j4SS1BjCC0CbPZFGYObbPVuFc+b+UNR7Xkzp8v
6PAbhh0s0lMIhB3MSoID3ByVM+1kk/TZhEEee2bI8B+yjcECQQDy/x2BssIFpBBm
FWPUnhQ8a0RxF28jx0NBnfYjDIR8nmetXOGcJyMWJZQXRWl0wZKrDjX2b+geuKwG
0CKX+S+dAkEAw8ZyA91yw9atz/KWCpB2EalkEBC7zIQtYg0jUTELV5WQfFBI/APj
VNJIHb9JrsdDuq0UcwoD1ts97bJN67nL6wJAUQAFf/RshKDZ7o12x6siJ7nCCMi8
/XowyzCymaBUkY3kFX/+nKTXJ0zDfrZentLf5zFHf6xx/bulbGf5ABvKaQJBAJyc
ANUKryXuc/hnbJNi4LBcOwmG+VQvYEaRj/EBNLuJj52Cc//19EMEPGBfh0fja1DH
6BXmqw+TLsUY37B0XqUCQQCznVuGwP0g68vMws9C6qzbJDQz5LO2ouZdoc2qugot
dLY+Pktcdn9z6LV20JR/RdbzKlUKzyTHFjNgqO8WvEkl
-----END RSA PRIVATE KEY-----`,
    accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC51LED485SdAj26dCxq1J+VvY5
NRmU+FbxihCIQZVfTVRY9tLjEkIjRY51LEMI0dFqoUd5dG3LXvtERnZEOulJSZnp
kgLSdKR7ksl7dv88cPSrcYVbVELQrho7AbOuS8VBckde7vzFA8Z9vkJ5fYq3pLOR
5+2g6VbyNYxFofU0HwIDAQAB
-----END PUBLIC KEY-----`,
    refreshTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCoS1a/lipD493HBc5s2HJX5lLEFdhVkyCDYKHi51g6srgdJ/yW
/px5dpBYsa5vtfCS1kF+90EwefYcwGIGLldBSyTTv2DtYjcbDPuc3oq2TOLEaOtO
PFjpUmp9Da2YhWTbow/mFAgb9a5QH3SjpMFced3KPQP+ZbqwUGZdlmaroQIDAQAB
AoGAbC8qD7SnbMcBXRwVa5DkSC8OS3DDhZczkmC/EE6pP+p9Qnje/e2khsw51Fo8
CSHLCYljxwuIw3HTTP46xUBq48pUe4cqRAcg//UQyYBsn4Tfj8UflSno76DSj6ME
DPqvcPs1UOxlOilRBbnAnPYuDJ9o+d0ABl4wtM036yq6MNUCQQDTNWPRgQYheGuQ
EaFbkCrC6T/EdWHQ5bytmAFmYtwqSj2wwXFypCZzJdJnea20Ed2C1p/wmW6fZyi8
p4eWjX9TAkEAy/wdI1TdMyneorx0DSWnEzIFMbuW9jz+DNVyEsOd+X/d7D2ASwqb
DolMjGQX336tjq1rLBJCvA5x8Fw3hLduuwJAT7HwpUfzIUQICkesxBkFGaDbr+y+
6Q0XAcW+mXyqKMb0ujJz9VcdLwvRdbwDIFQxakJD/YxXooxRYcYxMkzYAwJAUVYR
+EiaexAy6gji7WsaF5lWYOI/66eeVVe2yKyfjSDjSJOtWD6+XSl6EHDI5CEK611S
4pvVaE8KN6FNsenCiQJBAIuywIlN1WuX7s8URDlW3Y2yna5pFFPBcSvfnSgYq9uh
cEsz7vJ0RqP6xuJzr3L0iNubnIMDGwKArzzNgyVGdAU=
-----END RSA PRIVATE KEY-----`,
    refreshTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoS1a/lipD493HBc5s2HJX5lLE
FdhVkyCDYKHi51g6srgdJ/yW/px5dpBYsa5vtfCS1kF+90EwefYcwGIGLldBSyTT
v2DtYjcbDPuc3oq2TOLEaOtOPFjpUmp9Da2YhWTbow/mFAgb9a5QH3SjpMFced3K
PQP+ZbqwUGZdlmaroQIDAQAB
-----END PUBLIC KEY-----`,
};
// accessTokenPrivateKeyEncoded: `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWFFJQkFBS0JnUUM1MUxFRDQ4NVNkQWoyNmRDeHExSitWdlk1TlJtVStGYnhpaENJUVpWZlRWUlk5dExqCkVrSWpSWTUxTEVNSTBkRnFvVWQ1ZEczTFh2dEVSblpFT3VsSlNabnBrZ0xTZEtSN2tzbDdkdjg4Y1BTcmNZVmIKVkVMUXJobzdBYk91UzhWQmNrZGU3dnpGQThaOXZrSjVmWXEzcExPUjUrMmc2VmJ5Tll4Rm9mVTBId0lEQVFBQgpBb0dBU2xYeW1ZTy9QT3g5eVlldW0rUFVsQVZsYVd6OFZzTWd4RzVlUHFNOWhXb0JtN1RnbDBUdWYvMkxCd1ExCnJJbUNKQTF2OGYzSkRkbG8yZDcxNEVWUW0vajRTUzFCakNDMENiUFpGR1lPYmJQVnVGYytiK1VOUjdYa3pwOHYKNlBBYmhoMHMwbE1JaEIzTVNvSUQzQnlWTSsxa2svVFpoRUVlZTJiSThCK3lqY0VDUVFEeS94MkJzc0lGcEJCbQpGV1BVbmhROGEwUnhGMjhqeDBOQm5mWWpESVI4bm1ldFhPR2NKeU1XSlpRWFJXbDB3WktyRGpYMmIrZ2V1S3dHCjBDS1grUytkQWtFQXc4WnlBOTF5dzlhdHovS1dDcEIyRWFsa0VCQzd6SVF0WWcwalVURUxWNVdRZkZCSS9BUGoKVk5KSUhiOUpyc2REdXEwVWN3b0QxdHM5N2JKTjY3bkw2d0pBVVFBRmYvUnNoS0RaN28xMng2c2lKN25DQ01pOAovWG93eXpDeW1hQlVrWTNrRlgvK25LVFhKMHpEZnJaZW50TGY1ekZIZjZ4eC9idWxiR2Y1QUJ2S2FRSkJBSnljCkFOVUtyeVh1Yy9obmJKTmk0TEJjT3dtRytWUXZZRWFSai9FQk5MdUpqNTJDYy8vMTlFTUVQR0JmaDBmamExREgKNkJYbXF3K1RMc1VZMzdCMFhxVUNRUUN6blZ1R3dQMGc2OHZNd3M5QzZxemJKRFF6NUxPMm91WmRvYzJxdWdvdApkTFkrUGt0Y2RuOXo2TFYyMEpSL1JkYnpLbFVLenlUSEZqTmdxTzhXdkVrbAotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==`,
//     accessTokenPublicKeyEncoded: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDNTFMRUQ0ODVTZEFqMjZkQ3hxMUorVnZZNQpOUm1VK0ZieGloQ0lRWlZmVFZSWTl0TGpFa0lqUlk1MUxFTUkwZEZxb1VkNWRHM0xYdnRFUm5aRU91bEpTWm5wCmtnTFNkS1I3a3NsN2R2ODhjUFNyY1lWYlZFTFFyaG83QWJPdVM4VkJja2RlN3Z6RkE4Wjl2a0o1ZllxM3BMT1IKNSsyZzZWYnlOWXhGb2ZVMEh3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==`,
//     refreshTokenPrivateKeyEncoded: `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWEFJQkFBS0JnUUNvUzFhL2xpcEQ0OTNIQmM1czJISlg1bExFRmRoVmt5Q0RZS0hpNTFnNnNyZ2RKL3lXCi9weDVkcEJZc2E1dnRmQ1Mxa0YrOTBFd2VmWWN3R0lHTGxkQlN5VFR2MkR0WWpjYkRQdWMzb3EyVE9MRWFPdE8KUEZqcFVtcDlEYTJZaFdUYm93L21GQWdiOWE1UUgzU2pwTUZjZWQzS1BRUCtaYnF3VUdaZGxtYXJvUUlEQVFBQgpBb0dBYkM4cUQ3U25iTWNCWFJ3VmE1RGtTQzhPUzNERGhaY3prbUMvRUU2cFArcDlRbmplL2Uya2hzdzUxRm84CkNTSExDWWxqeHd1SXczSFRUUDQ2eFVCcTQ4cFVlNGNxUkFjZy8vVVF5WUJzbjRUZmo4VWZsU25vNzZEU2o2TUUKRFBxdmNQczFVT3hsT2lsUkJibkFuUFl1REo5bytkMEFCbDR3dE0wMzZ5cTZNTlVDUVFEVE5XUFJnUVloZUd1UQpFYUZia0NyQzZUL0VkV0hRNWJ5dG1BRm1ZdHdxU2oyd3dYRnlwQ1p6SmRKbmVhMjBFZDJDMXAvd21XNmZaeWk4CnA0ZVdqWDlUQWtFQXkvd2RJMVRkTXluZW9yeDBEU1duRXpJRk1idVc5anorRE5WeUVzT2QrWC9kN0QyQVN3cWIKRG9sTWpHUVgzMzZ0anExckxCSkN2QTV4OEZ3M2hMZHV1d0pBVDdId3BVZnpJVVFJQ2tlc3hCa0ZHYURicit5Kwo2UTBYQWNXK21YeXFLTWIwdWpKejlWY2RMd3ZSZGJ3RElGUXhha0pEL1l4WG9veFJZY1l4TWt6WUF3SkFVVllSCitFaWFleEF5NmdqaTdXc2FGNWxXWU9JLzY2ZWVWVmUyeUt5ZmpTRGpTSk90V0Q2K1hTbDZFSERJNUNFSzYxMVMKNHB2VmFFOEtONkZOc2VuQ2lRSkJBSXV5d0lsTjFXdVg3czhVUkRsVzNZMnluYTVwRkZQQmNTdmZuU2dZcTl1aApjRXN6N3ZKMFJxUDZ4dUp6cjNMMGlOdWJuSU1ER3dLQXJ6ek5neVZHZEFVPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==`,
//     refreshTokenPublicKeyEncoded: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDb1MxYS9saXBENDkzSEJjNXMySEpYNWxMRQpGZGhWa3lDRFlLSGk1MWc2c3JnZEoveVcvcHg1ZHBCWXNhNXZ0ZkNTMWtGKzkwRXdlZlljd0dJR0xsZEJTeVRUCnYyRHRZamNiRFB1YzNvcTJUT0xFYU90T1BGanBVbXA5RGEyWWhXVGJvdy9tRkFnYjlhNVFIM1NqcE1GY2VkM0sKUFFQK1picXdVR1pkbG1hcm9RSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==`,
//
