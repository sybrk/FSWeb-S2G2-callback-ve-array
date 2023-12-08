const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const final2014 = fifaData.filter((item) => item["Year"] === 2014 && item["Stage"] === "Final");
console.log(final2014);
const homeTeamName = final2014[0]["Home Team Name"];
console.log(homeTeamName);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const awayTeamName = final2014[0]["Away Team Name"];
console.log(awayTeamName);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const homeTeamGoals = final2014[0]["Home Team Goals"];
console.log(homeTeamGoals);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const awayTeamGoals = final2014[0]["Away Team Goals"];
console.log(awayTeamGoals);
//(e) 2014 Dünya kupası finali kazananı*/
const winner = final2014[0]["Win conditions"].split(' win')[0];
console.log(winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(array) {
	
    return array.filter((item) => item["Stage"] === "Final")
}



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array, cb) {
	
    const finals = cb(array);
	return finals.map((item) => item["Year"]);
}


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(array, cb) {
	
   const finals = cb(array);
   let winners = [];
   for (let i in finals) {
	const item = finals[i];
	if (item["Home Team Goals"] > item["Away Team Goals"]) {
		winners.push(item["Home Team Name"]);
	} else if (item["Home Team Goals"] < item["Away Team Goals"]) {
		winners.push(item["Away Team Name"]);
	} else {
		winners.push(item["Win conditions"].split(' win')[0]);
	}
   }
   return winners;
}



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(array, cb, cb2, cb3) {
	
	const finals = cb(array); // Finaller(array)
	// burada cb2 yerine üstte yazdığımız Yillar gelecek. Onun kendi cb'sine de Finaller geleceği için burada cb değil Finaller yazdık.
	const years = cb2(array, Finaller); // Yillar(array, cb)
	// üsttekiyle aynı mantık. cb3 yerine Kazananlar gelecek. O formülün de cb'si Finaller olacağı için burada Finaller'i yazdık.
	const winners = cb3(array, Finaller) // Kazananlar(array, cb)
	let result = [];
	for (let i in finals) {
		const final = finals[i];
		const year = years[i];
		const winner = winners[i];
		result.push(`${year} yılında, ${winner} dünya kupasını kazandı!`);
	}
	return result;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(cb) {
	
	const finals = cb;
	const totalGoals = finals.reduce((total, num) => total + num["Home Team Goals"] + num["Away Team Goals"], 0);
	return (totalGoals / finals.length).toFixed(2);
}



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(array, initials) {
	
   const homeFinalist = Finaller(array).filter((item) => item["Home Team Initials"] === initials);
   const awayFinalist = Finaller(array).filter((item) => item["Away Team Initials"] === initials);
   let winTimes = 0;
   for (let i in homeFinalist) {
	const item = homeFinalist[i];
	if (item["Home Team Goals"] > item["Away Team Goals"]) {
		winTimes++
	}
   }
   for (let i in awayFinalist) {
	const item = awayFinalist[i];
	if (item["Home Team Goals"] < item["Away Team Goals"]) {
		winTimes++
	}
   }
   return winTimes;	
}

console.log(UlkelerinKazanmaSayilari(fifaData, "BRA"));


/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(array) {
	
    const finals = Finaller(array);
	
	let teamsAndGoals = {};
	for (let i in finals) {
		const homeTeamName = finals[i]["Home Team Name"];
		const homeTeamGoals = finals[i]["Home Team Goals"];
		const awayTeamName = finals[i]["Away Team Name"];
		const awayTeamGoals = finals[i]["Away Team Goals"];
		if (teamsAndGoals[homeTeamName] !==	undefined) {
			teamsAndGoals[homeTeamName] = teamsAndGoals[homeTeamName] + homeTeamGoals;
		} else {
			teamsAndGoals[homeTeamName] = homeTeamGoals;
		}
		if (teamsAndGoals[awayTeamName] !==	undefined) {
			teamsAndGoals[awayTeamName] = teamsAndGoals[awayTeamName] + awayTeamGoals;
		} else {
			teamsAndGoals[awayTeamName] = awayTeamGoals;
		}
	}
	//sort the obj with Object.entries() and sort() methods.
	const teamsAndGoalsSorted = Object.entries(teamsAndGoals).sort((x,y) => y[1] - x[1]);
	// get the first array's first item 
	return teamsAndGoalsSorted[0][0];
}

console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(array) {
	
    const finals = Finaller(array);
	
	let teamsAndGoals = {};
	for (let i in finals) {
		const homeTeamName = finals[i]["Home Team Name"];
		const homeTeamGoals = finals[i]["Home Team Goals"];
		const awayTeamName = finals[i]["Away Team Name"];
		const awayTeamGoals = finals[i]["Away Team Goals"];
		if (teamsAndGoals[homeTeamName] !==	undefined) {
			teamsAndGoals[homeTeamName] = teamsAndGoals[homeTeamName] + awayTeamGoals;
		} else {
			teamsAndGoals[homeTeamName] = awayTeamGoals;
		}
		if (teamsAndGoals[awayTeamName] !==	undefined) {
			teamsAndGoals[awayTeamName] = teamsAndGoals[awayTeamName] + homeTeamGoals;
		} else {
			teamsAndGoals[awayTeamName] = homeTeamGoals;
		}
	}
	//sort the obj with Object.entries() and sort() methods.
	const teamsAndGoalsSorted = Object.entries(teamsAndGoals).sort((x,y) => y[1] - x[1]);
	// get the first array's first item 
	return teamsAndGoalsSorted[0][0];
	
}

console.log(EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
