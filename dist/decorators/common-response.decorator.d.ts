export declare function CommonResponse(tag: string, { successType }: {
    successType: any;
}): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
