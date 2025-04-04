import { afterEach } from 'vitest';
import { cleanup } from "@testing-library/react";

afterEach(()=>{
	console.log("GLOBAL CLEAN BEING DONE");
	return cleanup();
});
