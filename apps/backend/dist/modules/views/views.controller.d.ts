import { ViewsService } from './views.service';
export declare class ViewsController {
    private readonly viewsService;
    constructor(viewsService: ViewsService);
    recordView(data: any): Promise<{
        success: boolean;
    }>;
    getHistory(userId: string): Promise<import("./entities/video-view.entity").VideoView[]>;
}
