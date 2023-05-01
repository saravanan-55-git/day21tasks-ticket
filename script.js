var api = 'https://app.ticketmaster.com/discovery/v2/events?apikey=vRdwIoPNT4txmIpnpLaLxuW0yKR2OC9f&locale=*';

async function call() {
    var url = fetch(api);
    // out = await url;
    // prom = out.json();
    // out1 = await prom;   
    var promise = await (await url).json();
    console.log(promise);

    var parent = document.querySelector('.parent');

    for(let i of promise._embedded.events) {
        try{
            console.log(i);
            var container = document.createElement("div");
            container.classList.add();
            
            var event_promoter = document.createElement('h6');
            event_promoter.innerText  = i.promoter.name;
            container.append(event_promoter);

            var event_img = document.createElement('img');
            event_img.setAttribute('src',i.images[0].url);
            container.append(event_img);

            var event_name = document.createElement("h3");
            event_name.innerText = i.name;
            container.append(event_name);

            var tick = document.createElement("p");
            tick.innerHTML = "Ticket upto.. "+ i.accessibility.ticketLimit;
            container.append(tick);

            var label_date = document.createElement('label');
            var event_date = document.createElement('input');

            event_date.setAttribute('type', 'date');
            event_date.setAttribute('value',i.dates.start.localDate);
            event_date.setAttribute('min','2023-01-31');
            event_date.setAttribute('max','2023-12-31');
            label_date.innerText = "Date of Event : "
            label_date.append(event_date);
            container.append(label_date);

            var status=document.createElement('p');
            status.innerHTML = "available   : " + i.dates.status.code;
            container.append(status);

            var book = document.createElement('a');
            book.setAttribute('href',i.url);
            book.setAttribute('target', '_blank');

            var booking_btn = document.createElement('button');
            booking_btn.innerText = "Book Now";
            book.append(booking_btn);
            container.append(book);
            parent.append(container);

        } catch(error){
            console.log(error);
        }
    }
}

call();