FROM node:20.15.1           

WORKDIR /wt24p19357         


COPY . /package*.json ./    

RUN npm install             

COPY . .                    

EXPOSE 3000                 
CMD ["node", "index.js"]   
