a=open('English (British).dic').read().split("\n")
b=""
for w in a:
    w=w.split("/")[0]
    if len(w)<8 and w.find("'")==-1 and w.find('.')==-1:
        b=b+w.lower()+"\n"


f=open('en.dic','w')
f.write(b)
f.close()