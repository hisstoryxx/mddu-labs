"use client";

import { useState, useId } from "react";
import { Plus, Trash2, ChevronDown, GripVertical } from "lucide-react";
import type { ProfessorDetail } from "@/lib/types/database";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ============================================
// Types
// ============================================

interface Section {
  id?: string;
  key: string; // stable key for dnd
  section_type: string;
  items: string[] | Record<string, string[]>;
  display_order: number;
}

interface Props {
  details: ProfessorDetail[];
  onChange: (sections: Omit<Section, "key">[]) => void;
}

const SECTION_TYPES = [
  { value: "주요 경력", isGrouped: false },
  { value: "기타 사항", isGrouped: false },
  { value: "수상 경력", isGrouped: false },
  { value: "저역서", isGrouped: false },
  { value: "지식재산권", isGrouped: false },
  { value: "연구 과제", isGrouped: true },
];

function isGroupedItems(items: unknown): items is Record<string, string[]> {
  return typeof items === "object" && items !== null && !Array.isArray(items);
}

let keyCounter = 0;
function genKey() {
  return `k-${++keyCounter}-${Date.now()}`;
}

// ============================================
// Sortable Item Row (리스트 항목)
// ============================================

function SortableItem({
  id,
  index,
  value,
  onUpdate,
  onRemove,
}: {
  id: string;
  index: number;
  value: string;
  onUpdate: (val: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-1.5">
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="p-1 text-text-muted hover:text-text-primary cursor-grab active:cursor-grabbing flex-shrink-0 mt-1"
      >
        <GripVertical className="w-3.5 h-3.5" />
      </button>
      <span className="text-xs text-text-muted mt-2 w-4 text-right flex-shrink-0">
        {index + 1}
      </span>
      <input
        type="text"
        defaultValue={value}
        onBlur={(e) => onUpdate(e.target.value)}
        className="flex-1 text-xs px-2 py-1.5 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50"
      />
      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-text-muted hover:text-red-500 flex-shrink-0"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

// ============================================
// Sortable Group Item Row (그룹 내 항목)
// ============================================

function SortableGroupItem({
  id,
  value,
  onUpdate,
  onRemove,
}: {
  id: string;
  value: string;
  onUpdate: (val: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-1.5 ml-2">
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="p-1 text-text-muted hover:text-text-primary cursor-grab active:cursor-grabbing flex-shrink-0 mt-0.5"
      >
        <GripVertical className="w-3 h-3" />
      </button>
      <input
        type="text"
        defaultValue={value}
        onBlur={(e) => onUpdate(e.target.value)}
        className="flex-1 text-xs px-2 py-1.5 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50"
        placeholder="과제명"
      />
      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-text-muted hover:text-red-500 flex-shrink-0"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

// ============================================
// Sortable Section
// ============================================

function SortableSection({
  section,
  sectionIndex,
  isOpen,
  usedTypes,
  onToggle,
  onRemove,
  onChangeType,
  children,
}: {
  section: Section;
  sectionIndex: number;
  isOpen: boolean;
  usedTypes: string[];
  onToggle: () => void;
  onRemove: () => void;
  onChangeType: (newType: string) => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-border rounded-xl overflow-hidden bg-white"
    >
      <div className="flex items-center gap-2 px-3 py-3 bg-gray-50">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1 text-text-muted hover:text-text-primary cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <select
          value={section.section_type}
          onChange={(e) => onChangeType(e.target.value)}
          className="text-sm font-medium bg-transparent border-none focus:outline-none flex-1 cursor-pointer"
        >
          {SECTION_TYPES.map((t) => (
            <option
              key={t.value}
              value={t.value}
              disabled={usedTypes.includes(t.value) && t.value !== section.section_type}
            >
              {t.value}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onToggle}
          className="p-1 text-text-muted hover:text-text-primary"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isOpen && <div className="px-4 py-3 space-y-2">{children}</div>}
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function ProfessorDetailsEditor({ details, onChange }: Props) {
  const [sections, setSections] = useState<Section[]>(
    details.map((d) => ({
      id: d.id,
      key: genKey(),
      section_type: d.section_type,
      items: d.items as string[] | Record<string, string[]>,
      display_order: d.display_order,
    }))
  );
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  // item keys for stable dnd ids
  const [itemKeys, setItemKeys] = useState<Map<string, string[]>>(() => {
    const map = new Map<string, string[]>();
    sections.forEach((s) => {
      if (Array.isArray(s.items)) {
        map.set(s.key, s.items.map(() => genKey()));
      }
    });
    return map;
  });
  const [groupItemKeys, setGroupItemKeys] = useState<
    Map<string, Map<string, string[]>>
  >(() => {
    const map = new Map<string, Map<string, string[]>>();
    sections.forEach((s) => {
      if (isGroupedItems(s.items)) {
        const inner = new Map<string, string[]>();
        Object.entries(s.items).forEach(([gk, items]) => {
          inner.set(gk, items.map(() => genKey()));
        });
        map.set(s.key, inner);
      }
    });
    return map;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const emitChange = (newSections: Section[]) => {
    onChange(
      newSections.map(({ key, ...rest }) => rest)
    );
  };

  const update = (newSections: Section[]) => {
    setSections(newSections);
    emitChange(newSections);
  };

  const toggleOpen = (key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // ---- Section CRUD ----

  const addSection = () => {
    const usedTypes = sections.map((s) => s.section_type);
    const available = SECTION_TYPES.find((t) => !usedTypes.includes(t.value));
    if (!available) return;

    const newKey = genKey();
    const newSection: Section = {
      key: newKey,
      section_type: available.value,
      items: available.isGrouped ? {} : [],
      display_order: sections.length,
    };
    const newSections = [...sections, newSection];
    update(newSections);
    setOpenSections((prev) => new Set(prev).add(newKey));
    if (!available.isGrouped) {
      setItemKeys((prev) => new Map(prev).set(newKey, []));
    }
  };

  const removeSection = (key: string) => {
    const newSections = sections
      .filter((s) => s.key !== key)
      .map((s, i) => ({ ...s, display_order: i }));
    update(newSections);
  };

  const changeSectionType = (key: string, newType: string) => {
    const typeInfo = SECTION_TYPES.find((t) => t.value === newType);
    const newSections = sections.map((s) =>
      s.key === key
        ? { ...s, section_type: newType, items: typeInfo?.isGrouped ? {} : [] }
        : s
    );
    update(newSections);
    if (!typeInfo?.isGrouped) {
      setItemKeys((prev) => new Map(prev).set(key, []));
    }
  };

  // ---- Section drag ----

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.key === active.id);
    const newIndex = sections.findIndex((s) => s.key === over.id);
    const newSections = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      display_order: i,
    }));
    update(newSections);
  };

  // ---- List item CRUD + drag ----

  const getItemKeysForSection = (sectionKey: string, items: string[]) => {
    let keys = itemKeys.get(sectionKey);
    if (!keys || keys.length !== items.length) {
      keys = items.map(() => genKey());
      setItemKeys((prev) => new Map(prev).set(sectionKey, keys!));
    }
    return keys;
  };

  const addListItem = (sectionKey: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      return { ...s, items: [...(s.items as string[]), ""] };
    });
    update(newSections);
    setItemKeys((prev) => {
      const m = new Map(prev);
      m.set(sectionKey, [...(m.get(sectionKey) || []), genKey()]);
      return m;
    });
  };

  const updateListItem = (sectionKey: string, itemIndex: number, value: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = [...(s.items as string[])];
      items[itemIndex] = value;
      return { ...s, items };
    });
    update(newSections);
  };

  const removeListItem = (sectionKey: string, itemIndex: number) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      return { ...s, items: (s.items as string[]).filter((_, i) => i !== itemIndex) };
    });
    update(newSections);
    setItemKeys((prev) => {
      const m = new Map(prev);
      const keys = (m.get(sectionKey) || []).filter((_, i) => i !== itemIndex);
      m.set(sectionKey, keys);
      return m;
    });
  };

  const handleItemDragEnd = (sectionKey: string) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const keys = itemKeys.get(sectionKey) || [];
    const oldIndex = keys.indexOf(active.id as string);
    const newIndex = keys.indexOf(over.id as string);

    const section = sections.find((s) => s.key === sectionKey)!;
    const newItems = arrayMove(section.items as string[], oldIndex, newIndex);
    const newKeys = arrayMove(keys, oldIndex, newIndex);

    const newSections = sections.map((s) =>
      s.key === sectionKey ? { ...s, items: newItems } : s
    );
    update(newSections);
    setItemKeys((prev) => new Map(prev).set(sectionKey, newKeys));
  };

  // ---- Group item CRUD + drag ----

  const getGroupItemKeys = (sectionKey: string, groupKey: string, items: string[]) => {
    const sectionMap = groupItemKeys.get(sectionKey);
    let keys = sectionMap?.get(groupKey);
    if (!keys || keys.length !== items.length) {
      keys = items.map(() => genKey());
      setGroupItemKeys((prev) => {
        const m = new Map(prev);
        const inner = new Map(m.get(sectionKey) || []);
        inner.set(groupKey, keys!);
        m.set(sectionKey, inner);
        return m;
      });
    }
    return keys;
  };

  const addGroup = (sectionKey: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = { ...(s.items as Record<string, string[]>) };
      items["새 기관"] = [""];
      return { ...s, items };
    });
    update(newSections);
  };

  const renameGroup = (sectionKey: string, oldKey: string, newKey: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = s.items as Record<string, string[]>;
      const entries = Object.entries(items).map(([k, v]) =>
        k === oldKey ? [newKey, v] : [k, v]
      );
      return { ...s, items: Object.fromEntries(entries) };
    });
    update(newSections);
  };

  const removeGroup = (sectionKey: string, groupKey: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = { ...(s.items as Record<string, string[]>) };
      delete items[groupKey];
      return { ...s, items };
    });
    update(newSections);
  };

  const addGroupItem = (sectionKey: string, groupKey: string) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = { ...(s.items as Record<string, string[]>) };
      items[groupKey] = [...items[groupKey], ""];
      return { ...s, items };
    });
    update(newSections);
  };

  const updateGroupItem = (
    sectionKey: string,
    groupKey: string,
    itemIndex: number,
    value: string
  ) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = { ...(s.items as Record<string, string[]>) };
      const arr = [...items[groupKey]];
      arr[itemIndex] = value;
      items[groupKey] = arr;
      return { ...s, items };
    });
    update(newSections);
  };

  const removeGroupItem = (sectionKey: string, groupKey: string, itemIndex: number) => {
    const newSections = sections.map((s) => {
      if (s.key !== sectionKey) return s;
      const items = { ...(s.items as Record<string, string[]>) };
      items[groupKey] = items[groupKey].filter((_, i) => i !== itemIndex);
      return { ...s, items };
    });
    update(newSections);
  };

  const handleGroupItemDragEnd =
    (sectionKey: string, groupKey: string) => (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const keys = groupItemKeys.get(sectionKey)?.get(groupKey) || [];
      const oldIndex = keys.indexOf(active.id as string);
      const newIndex = keys.indexOf(over.id as string);

      const section = sections.find((s) => s.key === sectionKey)!;
      const groupItems = (section.items as Record<string, string[]>)[groupKey];
      const newItems = arrayMove(groupItems, oldIndex, newIndex);
      const newKeys = arrayMove(keys, oldIndex, newIndex);

      const newSections = sections.map((s) => {
        if (s.key !== sectionKey) return s;
        const items = { ...(s.items as Record<string, string[]>) };
        items[groupKey] = newItems;
        return { ...s, items };
      });
      update(newSections);
      setGroupItemKeys((prev) => {
        const m = new Map(prev);
        const inner = new Map(m.get(sectionKey) || []);
        inner.set(groupKey, newKeys);
        m.set(sectionKey, inner);
        return m;
      });
    };

  const usedTypes = sections.map((s) => s.section_type);
  const canAddMore = SECTION_TYPES.some((t) => !usedTypes.includes(t.value));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          교수 상세 정보
        </h3>
        {canAddMore && (
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-accent-light text-accent rounded-lg hover:bg-accent/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            섹션 추가
          </button>
        )}
      </div>

      {sections.length === 0 && (
        <p className="text-sm text-text-muted py-4 text-center">
          섹션이 없습니다. &quot;섹션 추가&quot; 버튼을 눌러 추가하세요.
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleSectionDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.key)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, sectionIndex) => {
            const isOpen = openSections.has(section.key);
            const typeInfo = SECTION_TYPES.find(
              (t) => t.value === section.section_type
            );
            const isGrouped =
              typeInfo?.isGrouped || isGroupedItems(section.items);

            return (
              <SortableSection
                key={section.key}
                section={section}
                sectionIndex={sectionIndex}
                isOpen={isOpen}
                usedTypes={usedTypes}
                onToggle={() => toggleOpen(section.key)}
                onRemove={() => removeSection(section.key)}
                onChangeType={(t) => changeSectionType(section.key, t)}
              >
                {isGrouped ? (
                  <>
                    {Object.entries(
                      section.items as Record<string, string[]>
                    ).map(([groupKey, groupItems]) => {
                      const gKeys = getGroupItemKeys(
                        section.key,
                        groupKey,
                        groupItems
                      );
                      return (
                        <div
                          key={groupKey}
                          className="border border-border/50 rounded-lg p-3 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={groupKey}
                              onBlur={(e) => {
                                if (
                                  e.target.value &&
                                  e.target.value !== groupKey
                                ) {
                                  renameGroup(
                                    section.key,
                                    groupKey,
                                    e.target.value
                                  );
                                }
                              }}
                              className="text-sm font-semibold text-yonsei-blue bg-transparent border-b border-transparent focus:border-accent focus:outline-none flex-1"
                              placeholder="기관명"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeGroup(section.key, groupKey)
                              }
                              className="p-1 text-text-muted hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleGroupItemDragEnd(
                              section.key,
                              groupKey
                            )}
                          >
                            <SortableContext
                              items={gKeys}
                              strategy={verticalListSortingStrategy}
                            >
                              {groupItems.map((item, itemIndex) => (
                                <SortableGroupItem
                                  key={gKeys[itemIndex]}
                                  id={gKeys[itemIndex]}
                                  value={item}
                                  onUpdate={(val) =>
                                    updateGroupItem(
                                      section.key,
                                      groupKey,
                                      itemIndex,
                                      val
                                    )
                                  }
                                  onRemove={() =>
                                    removeGroupItem(
                                      section.key,
                                      groupKey,
                                      itemIndex
                                    )
                                  }
                                />
                              ))}
                            </SortableContext>
                          </DndContext>
                          <button
                            type="button"
                            onClick={() =>
                              addGroupItem(section.key, groupKey)
                            }
                            className="text-xs text-accent hover:underline ml-2"
                          >
                            + 과제 추가
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => addGroup(section.key)}
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      기관 추가
                    </button>
                  </>
                ) : (
                  <>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleItemDragEnd(section.key)}
                    >
                      <SortableContext
                        items={getItemKeysForSection(
                          section.key,
                          section.items as string[]
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {(section.items as string[]).map(
                          (item, itemIndex) => {
                            const keys = getItemKeysForSection(
                              section.key,
                              section.items as string[]
                            );
                            return (
                              <SortableItem
                                key={keys[itemIndex]}
                                id={keys[itemIndex]}
                                index={itemIndex}
                                value={item}
                                onUpdate={(val) =>
                                  updateListItem(
                                    section.key,
                                    itemIndex,
                                    val
                                  )
                                }
                                onRemove={() =>
                                  removeListItem(section.key, itemIndex)
                                }
                              />
                            );
                          }
                        )}
                      </SortableContext>
                    </DndContext>
                    <button
                      type="button"
                      onClick={() => addListItem(section.key)}
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      항목 추가
                    </button>
                  </>
                )}
              </SortableSection>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
