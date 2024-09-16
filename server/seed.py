from app import app
from models import db, Ocean, Animal, Plant, User, Favorite # models go here
from faker import Faker

faker = Faker()

if __name__ == '__main__':
    with app.app_context():

        Ocean.query.delete()
        Animal.query.delete()
        Plant.query.delete()
        User.query.delete()
        
        print("Seeding database...")

        ocean1 = Ocean(name='Atlantic', avg_depth='10,932 ft', deepest_point='28,232 ft', surface_area='41.1 million mi²', about='The Atlantic Ocean is approximately one-fifth of Earth\'s surface and separating the continents of Europe and Africa to the east from those of North and South America to the west. The ocean\'s name, derived from Greek mythology, means the “Sea of Atlas.” It is second in size to the Pacific Ocean.',
        ofun_fact='The Atlantic Ocean is the youngest of the five oceans, having formed during the Jurassic Period approximately 150 million years ago following the breakup of the supercontinent Pangaea.',
        img='https://csridentity.com/images/atlanticocean.jpg', map='https://science4fun.info/wp-content/uploads/2022/02/Atlantic-Ocean-Map.jpg' )
        ocean2 = Ocean(name='Pacific', avg_depth='13,000 ft', deepest_point='35,876 ft', surface_area='63.8 million mi²', about='The Pacific Ocean is the largest and deepest ocean on Earth. It spans 60 million square miles from California to China, and in certain regions extends tens of thousands of feet below the surface of the water. It\'s name stands for peaceful.',
        ofun_fact='A fun fact about the Pacific Ocean is that it is the largest ocean on Earth, covering more area than all the land on Earth combined (More then 30 percent of Earth\'s surface area), and also holds the deepest point on the planet, known as the Challenger Deep in the Mariana Trench',
        img='https://www.americanoceans.org/wp-content/uploads/2023/09/atlantic-vs-pacific-ocean-scaled.jpeg', map='https://science4fun.info/wp-content/uploads/2022/02/Pacific-Ocean-Map.jpg' )
        ocean3 = Ocean(name='Indian', avg_depth='12,274 ft', deepest_point='23,920 ft', surface_area='27.24 million mi²', about='The Indian Ocean is the third-largest of the world\'s five oceanic divisions, covering 20 percent of the water on Earth\'s surface. It is bounded by Asia to the north, Africa to the west and Australia to the east. To the south it is bounded by the Southern Ocean, or Antarctica. It is named after India',
        ofun_fact='A fun fact about the Indian Ocean is that it contains a massive underwater plateau called the Kerguelen Plateau, which is considered a "submerged continent" and is roughly three times the size of Japan; making it one of only two major submerged continents on Earth',
        img='https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/21/2020/10/how-to-sail-across-the-indian-ocean-Le-Morne-Brabant-peninsula-maritius-credit-Roberto-Moiola-Getty.jpg', map='https://www.arcgis.com/sharing/rest/content/items/147937cf124843fcb86126b028e8d97c/resources/images/widget_954/1684939456673.png' )
        ocean4 = Ocean(name='Artic', avg_depth='3,240 ft', deepest_point='17,880 ft', surface_area='5.427 million mi²', about='The Arctic Ocean is the smallest and shallowest of the world\'s five oceanic divisions. It is the coldest of the world\'s oceans. The International Hydrographic Organization recognizes it as an ocean, although some oceanographers call it the Arctic Mediterranean Sea. The word "arctic" comes from the Greek word arktikos, which means "near the bear".',
        ofun_fact='The Arctic Ocean is mostly frozen over for most of the year, but the ice cover is shrinking due to climate change.',
        img='https://cff2.earth.com/uploads/2021/02/05165228/shutterstock_780681282-scaled.jpg', map='https://nsidc.org/sites/default/files/styles/article_image/public/images/Map/ArcticOcean.png.webp?itok=RRcf2eUu' )
        ocean5 = Ocean(name='Southern/Antarctic', avg_depth='10,728 ft', deepest_point='24,390 ft', surface_area='7.849 million mi²', about='The Southern Ocean (also known as the Antarctic Ocean) is the most southerly of the planet\'s five oceans. It completely surrounds the continent of Antarctica and connects the southern waters of the Pacific, Indian, and Atlantic oceans. The Southern Ocean is the fourth-largest ocean in the world. The name "Antarctica" comes from the Greek word antarktikos, which means "opposite to the Arctic" or "opposite to the north"',
        ofun_fact='The Antarctic Ocean has the strongest average winds on Earth, especially in the latitudes known as the "Roaring Forties", "Furious Fifties", and "Shrieking Sixties". Also, the ocean floor has not been explored here.',
        img='https://e360.yale.edu/assets/site/_1500x1500_fit_center-center_80/Antarctic-Waters.jpg', map='https://www.blue-growth.org/Oceans_Rivers_Seas/Seas_Pictures_Oceans_Rivers/Antarctica-RegionSouthern-Ocean-Convergence.gif' )

