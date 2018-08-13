
import { ViewState } from "./ViewState";
import { PageManager } from "./PageManager";


$("document").ready(() => {

    let state = new ViewState();
    let pageMng = new PageManager(state);

    pageMng.initPage();
});






















