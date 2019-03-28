var Destination = require('../models/item');

module.exports.getAllDestinations = function () {

    let destinations = [];
    for (let i = 0; i < data.length; i++) {
        let dest = new Destination(data[i].dest_code,
            data[i].dest_name,
            data[i].catalog_category,
            data[i].description,
            data[i].verdict,
            getImageURL(data[i].dest_code));

            destinations.push(dest);

    }
    return destinations;

};

getImageURL = function(dest_code){
  return "/../assets/images/"+dest_code+".jpg"
};

module.exports.getDestinationDetails = function (dest_code) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].dest_code) == dest_code) {
            let dest = new Destination(data[i].dest_code,
                data[i].dest_name,
                data[i].catalog_category,
                data[i].description,
                data[i].verdict,
                getImageURL(data[i].dest_code));
            return dest;
        }
    }
};

var data = [
    {
        dest_code: 1,
        dest_name: "The Fitzroy Trek",
        catalog_category: "Trekking",
        description: "I'm not exaggerating, nor do I get carried away by the emotions or the excitatory effect of the Argentinian mate. I'm serious; this is one of the best hiking routes in all South America\! The landscapes down there are amazing in the Patagonian style, with trees that change color, large glaciers, turquoise lagoons and disproportionate rock walls\. Many people compare this place with the famous and equally impressive Torres del Paine in Chile, and they are right; both hikes are amazing and have similar landscapes. However, the hikes around the Fitz Roy Trek and Cerro Torre, located in \"Los Glaciares National Park\", offer a variety of opportunities for all levels. Once you reach the small and friendly town of El Chalten, in the South of Argentina, a wide range of options opens up before your eyes, from short walks to long trails or even rock climbing.",
        verdict: "Recommended",

    },
    {
        dest_code: 2,
        dest_name: "Pays Dogon",
        catalog_category: "Trekking",
        description: "Pays Dogon, Mali is unlike the usual places which come to people’s minds when they think of trekking. Also known as Dogon Country, it is an isolated area which is situated in eastern Mali and it is not that far from the Burkina Faso border. The Dogon people reside in villages constituted of mud brick houses on rock faces that rise to up to 500 meters. This place is remote and rugged, the best place to be explored by foot. While the rest of Mali is predominantly Muslim, Dogon people are animists and ceremony or rituals still play a major role in their lives. A UNESCO World Heritage Site, the culture of this place is unlike anything else. Trekkers will get to take in everything from the green luscious onion fields to the red mud huts and high cliffs. The food available is mainly made out of millet and the carved windows and doors of the residents is an unspoken highlight of the tour.",
        verdict: "Recommended",
    },
    {
        dest_code: 3,
        dest_name: "The Long Range Traverse",
        catalog_category: "Trekking",
        description: "The Long Range Traverse is an unmarked and rugged backcountry route. It starts from Western Brook Pond, leads onto the Long Range Mountains and south towards Gros Morne Mountain before descending into Ferry Gulch and returning to highway 430 by way of the Gros Morne Mountain trail. Along the way a series of five campsites provide waypoints that help define the route. The route is 35 kilometres long and usually takes 3-4 nights to complete. The Long Range Traverse is an unmarked and rugged backcountry route. It starts from Western Brook Pond, leads onto the Long Range Mountains and south towards Gros Morne Mountain before descending into Ferry Gulch and returning to highway 430 by way of the Gros Morne Mountain trail. Along the way a series of five campsites provide waypoints that help define the route. The route is 35 kilometres long and usually takes 3-4 nights to complete.",
        verdict: "Recommended",
    },
    {
        dest_code: 4,
        dest_name: "Inca Trail",
        catalog_category: "Trekking",
        description: "The Inca Trail is by far the most famous trek in South America and is rated by many to be in the top 5 treks in the world. In just 26 miles (43km) it manages to combine beautiful mountain scenery, lush cloud-forest, subtropical jungle and, of course, a stunning mix of Inca paving stones, ruins and tunnels. The final destination of the trail just cannot be beaten: Machu Picchu, the mysterious \"Lost City of the Incas\". The Inca Trail is by far the most famous trek in South America and is rated by many to be in the top 5 treks in the world. In just 26 miles (43km) it manages to combine beautiful mountain scenery, lush cloud-forest, subtropical jungle and, of course, a stunning mix of Inca paving stones, ruins and tunnels. The final destination of the trail just cannot be beaten: Machu Picchu, the mysterious \"Lost City of the Incas\".",
        verdict: "Must Visit",
    },
    {
        dest_code: 5,
        dest_name: "Na Pali Coast",
        catalog_category: "Beaches",
        description: "Na Pali Coast State Park is touted as one of the most beautiful places on earth. Regal mountains and fluted peaks embellished with dramatic sea caves and valleys make it the epitome of paradise. Ancient Hawaiians once resided within the many valleys in this esteemed locale. Their communities thrived, obtaining sustenance from fishing or harvesting produce like taro. Kalalau Valley nurtured the largest Nā Pali Coast community and continues drawing people to its cathedral-like beauty.",
        verdict: "Recommended",
    },
    {
        dest_code: 6,
        dest_name: "Whitehaven Beach",
        catalog_category: "Beaches",
        description: "Whitehaven Beach is a pristine, award winning beach on Whitsunday Island, the largest of the 74 islands in the Whitsundays. Whitehaven Beach stretches over seven kilometres and boasts brilliant white silica sand that is among the purest in the world. Sink your feet into the sand and wade into the warm waves that gently lap the shore and you'll soon realise why people come here from all over the world. At the northern end of Whitehaven Beach is Hill Inlet, a stunning inlet where the tide shifts the sand and water to create a beautiful fusion of colours. Many people claim Hill Inlet and Whitehaven Beach are the most beautiful places they've ever seen. The lookout at Tongue Point is the best spot from which to view the swirling sands of Hill Inlet, so if you don't mind a short bushwalk, book your Whitehaven tour with an operator that visits the lookout. Whitehaven Beach can be experienced in several ways. If you're interested in a day trip there are ferries, yachts, power boats and luxury cruising yachts that depart from Airlie Beach. A variety of sailing companies also offer multi-day charters that include a memorable visit to Whitehaven Beach.",
        verdict: "Must Visit",
    },
    {
        dest_code: 7,
        dest_name: "Railay Beach",
        catalog_category: "Beaches",
        description: "Railay Beach is, in fact, a small peninsula which counts four beaches. Now on every savvy traveller's list, Railay is nevertheless one of Thailand's most sought-after beach areas. Just south of Ao Nang Beach, around a rocky headland and accessible only by boat, Railay presents a tranquil and extraordinary world. In just one small peninsula you'll find gorgeous white sand beaches, soaring limestone cliffs, viewpoints, caves and a lagoon hidden inside the cliffs, shaped and fed by the changing tides. All within walking distance! At Railay there are no roads; only footpaths. No buses, no cars, just longtail boats. Although it's actually connected to the mainland, the spectacular Phra Nang Peninsular is effectively cut off from the rest of Krabi by limestone headlands and steep jungle valleys; the only access is by sea. The very picture of tropical paradise, with no roads and no hassle, Railay offers lazy days, adventure forays and chilled-out evenings.",
        verdict: "Recommended",
    },
    {
        dest_code: 8,
        dest_name: "Boracay White Beach",
        catalog_category: "Beaches",
        description: "White Beach de Boracay is strategically located at Station 1, the center of the island, this affordable beach front hotel is a perfect escape to a new paradise. To make accessing easy, the property is close to all famous places, establishments, and several beautiful spots you must see for a very reasonable price. Staying here, guests can enjoy interesting recreational activities including snorkeling, parasailing, jet skiing, fishing and etc.",
        verdict: "Recommended",
    },
    {
        dest_code: 9,
        dest_name: "Yosemite National Park",
        catalog_category: "Adventure",
        description: "Yosemite National Park in beautiful Mariposa County welcomes you to experience this majestic park in all four seasons. Explore things to do, such as seeing awe-inspiring vistas, granite icons, breath-taking waterfalls, and discovering fascinating history, all while staying in Yosemite and Mariposa County. Whether it’s your first time visiting Yosemite National Park or you’re a seasoned veteran traveler, you’ll always find something new to do here. Search for events, lodging, dining, directions and more.",
        verdict: "Recommended",
    },

    {
        dest_code: 10,
        dest_name: "Sydney",
        catalog_category: "Adventure",
        description: "Enjoy the thrill of skydiving and hang-gliding in Wollongong. Visit the Penrith Whitewater Stadium in Sydney’s west for whitewater rafting on an Olympic course. Rent a bicycle in Sydney’s Centennial Parklands. Paddle a kayak on Sydney Harbour or zoom around the harbour on a jet boat. On the North Coast, try parasailing in Port Stephens and dive or snorkel reefs in Byron Bay. Hot-air ballooning is popular in Sydney, the Hunter Valley and Byron Bay. Visitors can play golf at many courses in Sydney and the NSW regions and in winter and early spring, there are skiing trips to the Snowy Mountains.",
        verdict: "Must Visit",
    },
    {
        dest_code: 11,
        dest_name: "Fiji",
        catalog_category: "Adventure",
        description: "Located in the heart of the South Pacific, Fiji is blessed with 333 tropical islands that are home to some of the happiest people on Earth. Known for its luxurious private-islands, all-inclusive resorts, top spas, culinary destinations and outdoor adventures, Fiji is most widely celebrated for its culture, which uniquely welcomes visitors home. Fiji's white sand beaches and pristine, crystal-clear ocean waters offer an ideal vacation destination for divers, honeymooners and families-- or simply, those looking to relax and get away from it all. Fiji is easily accessible through convenient, non-stop flights from Los Angeles, San Francisco or Honolulu aboard Fiji Airways.",
        verdict: "Recommended",
    },
    {
        dest_code: 12,
        dest_name: "Victoria Falls",
        catalog_category: "Adventure",
        description: "Victoria Falls presents a spectacular sight of awe-inspiring beauty and grandeur on the Zambezi River, forming the border between Zambia and Zimbabwe. It was described by the Kololo tribe living in the area in the 1800’s as ‘Mosi-oa-Tunya’ – ‘The Smoke that Thunders’. In more modern terms Victoria Falls is known as the greatest curtain of falling water in the world. Columns of spray can be seen from miles away as, at the height of the rainy season, more than five hundred million cubic meters of water per minute plummet over the edge, over a width of nearly two kilometers, into a gorge over one hundred meters below\. The wide, basalt cliff over which the falls thunder, transforms the Zambezi from a placid river into a ferocious torrent cutting through a series of dramatic gorges. Facing the Falls is another sheer wall of basalt, rising to the same height, and capped by mist-soaked rain forest. A path along the edge of the forest provides the visitor prepared to brave the tremendous spray, with an unparalleled series of views of the Falls. One special vantage point is across the Knife-edge Bridge, where visitors can have the finest view of the Eastern Cataract and the Main Falls as well as the Boiling Pot, where the river turns and heads down the Batoka Gorge. Other vantage points include the Falls Bridge, Devils Pool and the Lookout Tree, both of which command panoramic views across the Main Falls.",
        verdict: "Must Visit",
    },
];


module.exports.getCategories = function () {
    categories = [ 'Trekking' , 'Beaches' ,'Adventure' ]
    return categories;
};
