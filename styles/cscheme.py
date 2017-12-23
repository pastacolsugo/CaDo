import json
cs=json.loads("""{"type":"html","id":"3A51I--uuvywt","colorspace":"RGB","colorspaceinfo":"","scheme":{"primary":{"ttl":"Primary+Color","col":[{"hex":"004E9E","r":0,"g":78,"b":158,"name":[]},{"hex":"1D4977","r":29,"g":73,"b":119,"name":[]},{"hex":"003368","r":0,"g":51,"b":104,"name":[]},{"hex":"3580CF","r":53,"g":128,"b":207,"name":[]},{"hex":"5F96CF","r":95,"g":150,"b":207,"name":[]}]},"secondary-a":{"ttl":"Secondary+Color+A","col":[{"hex":"001AA6","r":0,"g":26,"b":166,"name":[]},{"hex":"1F2E7D","r":31,"g":46,"b":125,"name":[]},{"hex":"00116D","r":0,"g":17,"b":109,"name":[]},{"hex":"364ED3","r":54,"g":78,"b":211,"name":[]},{"hex":"6073D3","r":96,"g":115,"b":211,"name":[]}]},"secondary-b":{"ttl":"Secondary+Color+B","col":[{"hex":"009292","r":0,"g":146,"b":146,"name":[]},{"hex":"1B6E6E","r":27,"g":110,"b":110,"name":[]},{"hex":"005F5F","r":0,"g":95,"b":95,"name":[]},{"hex":"33C9C9","r":51,"g":201,"b":201,"name":[]},{"hex":"5CC9C9","r":92,"g":201,"b":201,"name":[]}]}}}""")
colors=[]
for c in cs["scheme"]["primary"]["col"]:
    colors.append("#"+c["hex"])
for c in cs["scheme"]["secondary-a"]["col"]:
    colors.append("#"+c["hex"])
for c in cs["scheme"]["secondary-b"]["col"]:
    colors.append("#"+c["hex"])
print json.dumps(colors)