User:
id, firstname, lastname, email, password

Product:
id, quantity, price, (photo)

(General: brand, model
Body: dimensions, weight, SIM?
Memory: cardSlot?, RAM, internal
Camera: main, selfie
Battery: capacity, removable?, 
Display: type, size, resolution, protection
Comms: netspeed, WI-FI, bluetooth, USB, ports, GPS, NFC
Platform: OS, CPU)

General: brand, model
Body: dimensions, weight
Memory: RAM + internal
Camera: main + selfie
Battery: capacity
Display: size, resolution
Connectivity: netspeed, USB
=11 caracteristici

Cart:
id, userId, cartProductList

CartProduct:
id, productId, quantity,

Address:
id, userId, town, county, phone

Orders:
id, userId, address, totalPrice, cartId

exista riscul de a creea mai multe inregistrari identice in bazele de date reprezentate de proprietaile telefoanelor!

Pagini noi:
-> istoric comenzi
-> editare profil
-> vezi ultimele produse accesate

-> realizeaza filtrarea imediata dupa fiecare filtru individual ales
-> alege modalitate plata: cash sau card 
-> voucher (?)
-> favorite
-> daca quantity=0 => dezactivare buton de adaugare in cos si afisare mesaj "stoc epuizat", altfel afisare mesaj "In stoc"
=> cauta produs dupa cuvantul introdus
-> anulare comanda intr-o perioada anume de timp
quickMobile - vezi site:
-> pe bara de sus: reduceri, noi produse, bara de seach + vezi ultimele produse vizitate, favorite, cos de cumparaturi, pagina profil personal



https://www.cel.ro/telefoane-mobile/telefon-mobil-samsung-galaxy-a20e-a202-2019-32gb-dual-sim-4g-white-pMCYyMTwpMw-l/

https://www.orange.ro/magazin-online/telefoane/huawei-p30-lite-128gb-dual-sim-black-reconditionat

https://www.quickmobile.ro/telefoane/telefoane-mobile/xiaomi-redmi-note-9t-dual-sim-fizic-128gb-5g-violet-4gb-ram-52685


//schimba ordinea produselor vizualizate
// console.log(ids)//2,3,4,5
    
    const newIndex=viewedProducts.length-1//3
    const oldIndex=ids.indexOf(foundProduct.id)-1//0

    // console.log(newIndex)
    // console.log(oldIndex)

    //exista si nu este ultimul produs vizualizat
    if (
      foundProduct &&
      oldIndex < newIndex
    ) {

      //schimb ordinea elementelor in TABELA 

      splice(newIndex, 0, viewedProducts.splice(oldIndex, 1)[0]);

      res.status(200).send(viewedProducts)

    } 
      updateRating: async (req, res) => {
    const userRating = req.body.rating;
    const ratingProduct = await RatingProductDB.findOne({
      where: {
        ProductId: req.params.id,
      },
    });

    if (ratingProduct) {
      //daca userul doreste sa schimbe ratingul ? trebuie retinut ratingul userului si eliminat nrRatings
      const newNrRatings = ratingProduct.nrRatings + 1;
      const newRating =
        (ratingProduct.rating * ratingProduct.nrRatings + userRating) /
        newNrRatings;
      ratingProduct
        .update({
          nrRatings: newNrRatings,
          rating: newRating,
        })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      const newRatingProduct = {
        nrRatings: 1,
        rating: userRating,
        ProductId: req.params.id,
      };

      RatingProductDB.create(newRatingProduct)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  },
   getRatingProduct: async (req, res) => {
    RatingProductDB.findOne({
      where: {
        ProductId: req.params.id,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },


    https://docs.appdynamics.com/display/PRO21/Hide+All+or+Parts+of+the+URL+Query+String

    products(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.lastStateProducts = oldVal;
      }
    },

//schimba dropdown cu casete de bifat
//trimite sugestie de produs catre un prieten + o notita despre produs + posibilitate editare notita(userii sa si poata vedea sugestiile trimise)- AM FACUT!

//dupa ce realizez o comanda, vezi istoric comenzi si da rating produselor + review, numai daca ai comandat acel produs!
//posibilitate de realizare a propriului cos cu produse care sa retina o anumita categorie (un cos!)

//ordoneaza dupa cele mai accesate produse
//ordoneaza dupa cele mai cumparate produse

//vouchere :-?
//notificari administrator :-?
//fa aplicatia responsive :-?

//change route and make an filter null when disable a radio button


  <div class="q-pa-md" :key="item">
              <q-carousel animated v-model="slide" arrows navigation infinite>
                <q-carousel-slide
                  v-for="photo in item.photos.split(', ')"
                  :key="photo"
                  :name="item.photos.split(', ').indexOf(photo)"
                  v-bind:img-src="`../photos/${photo}`"
                />
              </q-carousel>
            </div>

  // products.findAll({
    //   where: {
    //     reduction: {
    //       [Op.not]: null,
    //     },
    //   },
    // })
    //   .then((result) => {
    //     res.status(200).send(result);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });


     ProductDB.findAll({
      where: {
        createdAt: {
          [Op.gte]: d,
        },
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });


      