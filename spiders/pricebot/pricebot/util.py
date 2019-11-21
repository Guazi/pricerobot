def dot_notation(item):
    new_dict = {}
    for k in item:
        if (isinstance(item[k], dict)):
            for l in item[k]:
                new_key = k + "." + l
                new_dict[new_key] = item[k][l]
        else:
            new_dict[k] = item[k]

    return new_dict