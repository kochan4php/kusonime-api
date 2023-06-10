export default class ResponseHelper {
    static success(res, status, data) {
        return res
            .status(status)
            .type("application/json")
            .json({ success: true, data });
    }

    static failed(res, status, err) {
        return res
            .status(status)
            .type("application/json")
            .json({ success: false, err });
    }
}
