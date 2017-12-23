import json
cs=json.loads("""{"type":"txt","id":"3r51G--uuvywt","colorspace":"RGB","colorspaceinfo":"","scheme":{"primary":{"ttl":"Primary+Color","col":[{"hex":"006B99","r":0,"g":107,"b":153,"name":[]},{"hex":"1C5973","r":28,"g":89,"b":115,"name":[]},{"hex":"004664","r":0,"g":70,"b":100,"name":[]},{"hex":"349FCD","r":52,"g":159,"b":205,"name":[]},{"hex":"5DABCD","r":93,"g":171,"b":205,"name":[]}]},"secondary-a":{"ttl":"Secondary+Color+A","col":[{"hex":"003CA1","r":0,"g":60,"b":161,"name":[]},{"hex":"1E4079","r":30,"g":64,"b":121,"name":[]},{"hex":"002769","r":0,"g":39,"b":105,"name":[]},{"hex":"356FD1","r":53,"g":111,"b":209,"name":[]},{"hex":"5F89D1","r":95,"g":137,"b":209,"name":[]}]},"secondary-b":{"ttl":"Secondary+Color+B","col":[{"hex":"009E76","r":0,"g":158,"b":118,"name":[]},{"hex":"1D7761","r":29,"g":119,"b":97,"name":[]},{"hex":"00674E","r":0,"g":103,"b":78,"name":[]},{"hex":"35CFA8","r":53,"g":207,"b":168,"name":[]},{"hex":"5FCFB3","r":95,"g":207,"b":179,"name":[]}]}}}""")
colors=[]
for c in cs["scheme"]["primary"]["col"]:
    colors.append("#"+c["hex"])
for c in cs["scheme"]["secondary-a"]["col"]:
    colors.append("#"+c["hex"])
for c in cs["scheme"]["secondary-b"]["col"]:
    colors.append("#"+c["hex"])
print json.dumps(colors)