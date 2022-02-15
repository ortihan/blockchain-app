# blockchain-app
 Demo blockchain application with backend in Node.js and frontend in Angular
 
Da bi se pokrenula aplikacija, potrebno je najprije instalirati node.js (https://nodejs.org/en/) i npm package manager (automatski se instalira uz node.js), te uz npm instalirati Angular CLI (s naredbom: npm install -g @angular/cli). Nakon otvaranja aplikacije u nekom IDE-u, vjerojatno će se trebati izvršiti naredba npm install (da se instaliraju svi dependencies potrebni za projekt).



Za stvaranje decentralizirane mreže s tri sudionika, potrebno je pokrenuti backend dio aplikacije na tri različita porta, zatim i frontend dio na tri raličita porta. To se radi npr. na slijedeći način:

1. U tri različita terminala otvoriti folder /backend 
2. U prvom izvršiti naredbu: HTTP_PORT=3001 P2P_PORT=5001 npm run dev
3. Zatim u drugom: HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
4. Zatim u trećem: HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

Time smo pokrenuli backend na portovima 3001, 3002 i 3003, te ih povezali web socketima tako da međusobno komuniciraju.

5. U druga tri terminala otvoriti folder /frontend
6. U prvom izvršiti naredbu: ng serve --port 4200
7. U drugom: ng serve --port 4201
8. U trećem: ng serve --port 4202
9. Zatim u internet pregledniku otvoriti adrese http://localhost:4200, http://localhost:4201 i http://localhost:4202 u tri taba
10. U prvom tabu odabrati Peer 1, u drugom Peer 2 te u trećem Peer 3

Tako smo odabrali uloge različitih sudionika u mreži od kojih svaki razgovara sa svojim serverom, a međusobno dijele informacije o blokovima i transakcijama preko web socketa.
