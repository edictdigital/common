<h1 id="common-package">Common Package For Edict Digital LP Project</h1>

<h3 id="how-to-use-base-crud">How to Use Base CRUD</h3>

- Using Contoller
```typescript
@Controller('/api/some')
export class SomeController extends BaseController<Some> {
  constructor(private readonly someService: SomeService) {
    super(someService);
  }
}
```

- Using Service
```typescript
@Injectable()
export class SomeService extends BaseService<Some> {
  constructor(
    @InjectRepository(Some)
    private readonly someRepository: SomeRepository,
  ) {
    super(someRepository);
  }
}
```

NOT: Repository Repository\<Some\>'dan extend edilecek. Örneğin,
```typescript
@EntityRepository(Some)
export class SomeRepository extends Repository<Some> {
  async someAnotherFunction(...) {...}
}
```