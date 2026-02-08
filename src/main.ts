import { app } from "./LOS/App";
import { main } from "./LOS/Main";
import { topMenu, bottomMenu } from "./LOS/Menu";
import { viewport } from "./LOS/Viewport.ts";
import { updateLine } from "./LOS/Tiles";
import { tiles } from "./LOS/Tiles";

(async () => {
	//update
	app.ticker.maxFPS = 30;
	app.ticker.add(() => {
		updateLine();
		tiles.forEach((tile) => {
			tile.update();
		});
	});
	//define hierarchy
	document.body.appendChild(app.canvas);
	app.stage.addChild(viewport);
	app.stage.addChild(topMenu);
	app.stage.addChild(bottomMenu);
	viewport.addChild(main);
})();
