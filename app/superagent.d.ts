// Type definitions for SuperAgent 0.15.4
// Project: https://github.com/visionmedia/superagent
// Definitions by: Alex Varju <https://github.com/varju/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "superagent" {
    export interface Response {
        text: string;
        body: any;
        files: any;
        header: any;
        type: string;
        charset: string;
        status: number;
        statusType: number;
        info: boolean;
        ok: boolean;
        redirect: boolean;
        clientError: boolean;
        serverError: boolean;
        error: any;
        accepted: boolean;
        noContent: boolean;
        badRequest: boolean;
        unauthorized: boolean;
        notAcceptable: boolean;
        notFound: boolean;
        forbidden: boolean;
        get(header: string): string;
    }
    export interface Request {
        attach(field: string, file: string, filename: string): Request;
        redirects(n: number): Request;
        part(): Request;
        set(field: string, val: string): Request;
        set(field: Object): Request;
        get(field: string): string;
        type(val: string): Request;
        query(val: Object): Request;
        send(data: string): Request;
        send(data: Object): Request;
        write(data: string, encoding: string): boolean;
        buffer(val: boolean): Request;
        timeout(ms: number): Request;
        clearTimeout(): Request;
        abort(): void;
        auth(user: string, name: string): Request;
        field(name: string, val: string): Request;
        end(callback?: (err: Error, res: Response) => void): Request;
    }

    export function get(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function post(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function put(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function head(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function del(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function options(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function trace(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function copy(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function lock(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function mkcol(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function move(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function propfind(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function proppatch(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function unlock(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function report(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function mkactivity(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function checkout(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function merge(url: string, callback?: (err: Error, res: Response) => void): Request;
    //m-search(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function notify(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function subscribe(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function unsubscribe(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function patch(url: string, callback?: (err: Error, res: Response) => void): Request;
    export function parse(fn: Function): Request;
    export function saveCookies(res: Response): void;
    export function attachCookies(req: Request): void;
}
